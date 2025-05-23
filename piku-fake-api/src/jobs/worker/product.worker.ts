import { Worker } from 'bullmq';
import { redisClient } from '@/config/index.js';
import { optimizeImages, cloudinaryService, Logger } from '@/utils/index.js';
import { Product } from '@/models/index.js';

new Worker(
  'product-queue',
  async (job) => {
    try {
      Logger.info(`Worker started processing job: ${job.id}`);
      const { productData, files } = job.data;
      const { thumbnailPath, imagesPaths, videoPaths } = files;

      if (!thumbnailPath || !imagesPaths || !videoPaths) {
        throw new Error('Missing required files');
      }

      Logger.info('Optimizing thumbnail and uploading to Cloudinary');
      const optimizedThumbnail = await optimizeImages(thumbnailPath);
      const thumbnailUpload = await cloudinaryService.uploadImageOnCloudinary(
        optimizedThumbnail,
        'products',
      );

      Logger.info('Optimizing images and uploading to Cloudinary');
      const optimizedImages = await Promise.all(
        imagesPaths.map(async (path: string) => {
          const optimized = await optimizeImages(path);
          return cloudinaryService.uploadImageOnCloudinary(
            optimized,
            'products',
          );
        }),
      );
      const imageUrls = optimizedImages.map((res) => res?.secure_url);

      // Upload videos to Cloudinary
      const uploadedVideos = await Promise.all(
        videoPaths.map(async (path: string) => {
          return cloudinaryService.uploadVideoOnCloudinary(path, 'products');
        }),
      );
      const videoUrls = uploadedVideos.map((res) => res?.secure_url);

      Logger.info('Creating new product');
      const newProduct = await Product.create({
        ...productData,
        thumbnail: thumbnailUpload.secure_url,
        images: imageUrls,
        video: videoUrls,
      });

      Logger.info(`Product created by worker: ${newProduct._id}`);
    } catch (error) {
      Logger.error(`Error in worker job: ${error}`);
    }
  },
  { connection: redisClient },
);
