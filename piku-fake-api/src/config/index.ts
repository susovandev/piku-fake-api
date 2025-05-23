import config from '@/config/config.js';
import swaggerDocs from '@/config/swaggerConfig.js';
import connectDB from '@/config/db/index.js';
import upload from '@/config/multerConfig.js';
import redisClient from '@/config/redis.js';

export { config, swaggerDocs, connectDB, upload, redisClient };
