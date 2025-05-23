import { Queue } from 'bullmq';
import { redisClient } from '@/config/index.js';

export const productQueue = new Queue('product-queue', {
  connection: redisClient,
});
