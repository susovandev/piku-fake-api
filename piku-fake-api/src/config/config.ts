import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
  node_env: String(process.env.NODE_ENV) || 'DEVELOPMENT',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: String(process.env.DATABASE_URL)
};

export const config = Object.freeze(_config);
