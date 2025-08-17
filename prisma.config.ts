import { configDotenv } from 'dotenv';
import path from 'node:path';
import type { PrismaConfig } from 'prisma';
configDotenv();
export default {
  schema: path.join('prisma'),
} satisfies PrismaConfig;
