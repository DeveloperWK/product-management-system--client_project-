import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log:[
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' }
  ]

});
// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Duration: ' + e.duration + 'ms')
// })
const testConnection = async (maxRetries = 5, initialDelay = 1000) => {
  let attempts = 0;
  let delay = initialDelay;
  while (attempts < maxRetries) {
    try {
      await prisma.$connect();
      console.log(' 🐘 Prisma connected to PostgreSQL successfully!');
      return true;
    } catch (err) {
      attempts++;
      console.error(
        `❌ Failed to connect to PostgreSQL. Attempt ${attempts} of ${maxRetries}.`,
      );
      if (attempts < maxRetries) {
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        console.error('🚫 All retry attempts failed. Exiting.');
        return false;
      }
    } finally {
      if (attempts === maxRetries || attempts === 0) {
        prisma.$disconnect();
      }
    }
  }
};
export { prisma, testConnection };
