// prisma.client.ts
import { Prisma, PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

const createPrismaClient = (): PrismaClient => {
  const base = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "info", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
    transactionOptions: {
      maxWait: 5000,
      timeout: 10000,
    },
  });

  // Define an extension that times queries and logs slow ones.
  const slowQueryExtension = Prisma.defineExtension({
    name: "slow-query-logger",
    query: {
      // apply to all models
      $allModels: {
        // apply to all operations on each model
        async $allOperations({
          model,
          operation,
          args,
          query,
        }: {
          model: string;
          operation: string;
          args?: any;
          // `query` is the function that runs the real Prisma query
          query: (args?: any) => Promise<any>;
        }) {
          const started = Date.now();
          const result = await query(args);
          const duration = Date.now() - started;

          if (duration > 1000) {
            // adjust the threshold as you want
            console.warn(
              `⚠️ Slow query detected: ${model}.${operation} took ${duration}ms`
            );
          }

          return result;
        },
      },
    },
  });

  // Create an extended client (base + extension)

  // Keep the query event logger in dev for raw SQL visibility
  if (process.env.NODE_ENV === "development") {
    base.$on("query", (e) => {
      console.log("Query:", e.query);
      console.log("Duration:", `${e.duration}ms`);
      console.log("Params:", e.params);
    });
  }

  const extended = base.$extends(slowQueryExtension);

  return extended as PrismaClient;
};

export const getPrismaInstance = (): PrismaClient => {
  if (!prisma) prisma = createPrismaClient();
  return prisma;
};

// health check / retry connect
export const testConnection = async (
  maxRetries = 5,
  initialDelay = 1000
): Promise<boolean> => {
  const client = getPrismaInstance();
  let attempts = 0;
  let delay = initialDelay;

  while (attempts < maxRetries) {
    try {
      await client.$connect();
      console.log("🐘 Prisma connected to DB.");
      await client.$queryRaw`SELECT 1`;
      console.log("✅ DB test query ok.");
      return true;
    } catch (err: unknown) {
      attempts++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(
        `Attempt ${attempts}/${maxRetries} - connect failed: ${msg}`
      );
      if (attempts < maxRetries) {
        console.log(`Retrying in ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2;
      } else {
        console.error("🚫 All retries failed.");
        return false;
      }
    }
  }
  return false;
};

export const shutdownPrisma = async (): Promise<void> => {
  if (prisma) {
    console.log("Disconnecting Prisma...");
    await prisma.$disconnect();
    prisma = null;
    console.log("Prisma disconnected.");
  }
};

// graceful shutdown hooks
process.on("SIGINT", shutdownPrisma);
process.on("SIGTERM", shutdownPrisma);
