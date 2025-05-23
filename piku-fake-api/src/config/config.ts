import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
  node_env: String(process.env.NODE_ENV) || 'DEVELOPMENT',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: String(process.env.DATABASE_URL),
  cloudinary: {
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET),
  },
  redis: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
  },
};

const config = Object.freeze(_config);

export default config;
