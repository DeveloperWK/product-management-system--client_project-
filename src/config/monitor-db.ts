import { getPrismaInstance } from "./db.config";

async function monitorDatabase() {
  const prisma = getPrismaInstance();

  try {
    // Get database connection statistics
    const stats = await prisma.$queryRaw`
      SELECT 
        count(*) as total_connections,
        (SELECT setting FROM pg_settings WHERE name = 'max_connections') as max_connections,
        count(*) FILTER (WHERE state = 'active') as active_connections,
        count(*) FILTER (WHERE state = 'idle') as idle_connections,
        count(*) FILTER (WHERE state = 'idle in transaction') as idle_in_transaction
      FROM pg_stat_activity 
      WHERE datname = current_database()
    `;

    // @ts-ignore
    const usage = stats[0];
    const usagePercent = (
      (usage.total_connections / usage.max_connections) *
      100
    ).toFixed(1);

    console.log("\n=== Database Connection Report ===");
    console.log(
      `Connections: ${usage.total_connections}/${usage.max_connections} (${usagePercent}%)`
    );
    console.log(
      `Active: ${usage.active_connections}, Idle: ${usage.idle_connections}`
    );
    console.log(`Idle in transaction: ${usage.idle_in_transaction}`);

    // List long-running queries
    const longQueries = await prisma.$queryRaw`
      SELECT 
        pid,
        usename,
        application_name,
        client_addr,
        state,
        age(clock_timestamp(), query_start) as duration,
        query
      FROM pg_stat_activity 
      WHERE datname = current_database()
        AND state = 'active'
        AND clock_timestamp() - query_start > interval '5 seconds'
      ORDER BY duration DESC
      LIMIT 5
    `;

    // @ts-ignore
    if (longQueries.length > 0) {
      console.log("\n--- Long Running Queries (>5s) ---");
      // @ts-ignore
      longQueries.forEach((query) => {
        console.log(
          `PID: ${query.pid}, Duration: ${
            query.duration
          }, Query: ${query.query.substring(0, 100)}...`
        );
      });
    }
  } catch (error) {
    console.error("Monitoring error:", error);
  }
}

// Run monitoring if this script is executed directly
// @ts-ignore
if (import.meta.url === `file://${process.argv[1]}`) {
  monitorDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default monitorDatabase;
