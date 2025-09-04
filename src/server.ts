import { configDotenv } from "dotenv";
import cluster from "node:cluster";
import * as os from "node:os";
import app from "./app";
import { getPrismaInstance, testConnection } from "./config/db.config";
configDotenv();
const PORT = process.env.PORT;

// Calculate optimal worker count based on database capacity
const calculateOptimalWorkerCount = () => {
  const numCpu = os.cpus().length;
  const maxDbConnections = parseInt(
    process.env.DB_MAX_CONNECTIONS || "100",
    10
  );

  // Use a conservative estimate of 5 connections per worker
  const maxWorkersBasedOnDb = Math.floor(maxDbConnections / 5) - 1; // Reserve connections for other processes

  // Use the smaller of the two values, but ensure at least 1 worker
  const optimalWorkers = Math.min(numCpu, maxWorkersBasedOnDb);
  return Math.max(1, optimalWorkers); // Ensure at least 1 worker
};

if (cluster.isPrimary) {
  console.log(`Master process is running on PID ${process.pid}`);

  const optimalWorkerCount = calculateOptimalWorkerCount();
  console.log(
    `Forking ${optimalWorkerCount} workers (based on ${
      os.cpus().length
    } CPUs and DB capacity)`
  );

  // Keep track of worker IDs
  let nextWorkerId = 1;

  // Fork workers
  for (let i = 0; i < optimalWorkerCount; i++) {
    const worker = cluster.fork();
    const workerId = nextWorkerId++;
    worker.send({ workerId: workerId });
  }

  // Monitor worker health and connection usage
  const workerConnectionStats = new Map();

  cluster.on("message", (worker, message) => {
    if (message && message.type === "connectionStats") {
      workerConnectionStats.set(worker.id, {
        pid: worker.process.pid,
        active: message.active,
        max: message.max,
      });
    }
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );

    // Remove from stats
    workerConnectionStats.delete(worker.id);

    console.log(`Starting new worker to replace ${worker.process.pid}`);
    const newWorker = cluster.fork();
    const newWorkerId = nextWorkerId++;

    // Send the new worker its ID
    newWorker.send({ workerId: newWorkerId });
  });
} else {
  // Worker process
  let workerId: number | null = null;

  // Receive message from primary with worker ID
  process.on("message", (msg: { workerId: number }) => {
    if (msg && msg.workerId) {
      workerId = msg.workerId;
    }
  });

  // Wait until workerId is set
  const waitForWorkerId = () => {
    return new Promise<void>((resolve) => {
      const check = () => {
        if (workerId !== null) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  };

  // Track connection usage
  let activeConnections = 0;
  const MAX_CONNECTIONS_PER_WORKER = 5;

  // Add middleware to track HTTP request connections
  app.use((req, res, next) => {
    activeConnections++;

    // Notify primary process of connection count
    if (process.send) {
      process.send({
        type: "connectionStats",
        active: activeConnections,
        max: MAX_CONNECTIONS_PER_WORKER,
      });
    }

    res.on("finish", () => {
      activeConnections--;

      if (process.send) {
        process.send({
          type: "connectionStats",
          active: activeConnections,
          max: MAX_CONNECTIONS_PER_WORKER,
        });
      }
    });

    next();
  });

  // Test connection and start server
  testConnection()
    .then(async (connected) => {
      if (connected) {
        await waitForWorkerId(); // Wait for worker ID
        getPrismaInstance();
        app.listen(PORT, () => {
          console.log(
            `🚀 Worker ${
              workerId || process.pid
            } server running on port ${PORT}`
          );
        });
      } else {
        console.error(
          "Failed to establish database connection. Exiting worker."
        );
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error("Unexpected error during connection test:", err);
      process.exit(1);
    });
}
