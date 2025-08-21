import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'change-me-in-prod',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

if (!env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn('[env] DATABASE_URL is not set. Prisma will fail to connect until this is configured.');
}
