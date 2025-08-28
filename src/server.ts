import { configDotenv } from "dotenv";
import cluster from "node:cluster";
import * as os from "node:os";
import app from "./app";
import { testConnection } from "./config/db.config";

configDotenv();

const PORT = process.env.PORT || 8080;

if (cluster.isPrimary) {
  console.log(
    `Master process is running on PID ${process.pid}. Forking workers...`
  );
  const numCpu = os.cpus().length;
  let i = 0;
  for (i; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    console.log(`Worker ${worker.process.pid} started`);
    cluster.fork();
  });
} else {
  testConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

// testConnection()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });
