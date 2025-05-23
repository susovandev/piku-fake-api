import { Redis } from 'ioredis';
import { Logger } from '@/utils/index.js';
import { config } from '@/config/index.js';

const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null,
});

redisClient.on('connect', () => Logger.info('Redis connected successfully'));
redisClient.on('error', (err) =>
  Logger.error(`Redis connection failed: ${err}`),
);

export default redisClient;
