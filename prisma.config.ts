import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import { configDotenv } from 'dotenv';

configDotenv()
export default {
  schema: path.join('prisma'),
} satisfies PrismaConfig;
