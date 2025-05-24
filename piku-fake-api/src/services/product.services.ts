import { Types } from 'mongoose';
import { Product } from '@/models/index.js';
import { BadRequestException, Logger } from '@/utils/index.js';
import { redisClient } from '@/config/index.js';
import { IProduct } from '@/types/index.js';
import { productQueue } from '@/jobs/queue/product.queue.js';

interface JobFileData {
    thumbnailPath: string;
    imagesPaths: string[];
    videoPaths?: string[];
}

interface JobData {
    productData: Partial<IProduct>;
    files: JobFileData;
}
class ProductServices {
    getProductByIdService = async (productId: string): Promise<IProduct> => {
    if (!Types.ObjectId.isValid(productId)) {
        throw new BadRequestException('Invalid product ID');
    }
    const cacheKey = `product:${productId}`;
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
        return JSON.parse(cachedProduct);
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
        Logger.warn(`Product not found for ID: ${productId}`);
        throw new BadRequestException('Product not found with the provided ID');
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify(product));
    Logger.info(`Product set in cache for ID: ${productId}`);

    return product;
};

    createNewProductService = async (
        body: Partial<IProduct>,
        files: Record<string, Express.Multer.File[]>,
    ): Promise<void> => {
    const images = files?.images || [];
    const videos = files?.videos || [];
    const thumbnailLocalFilePath = files?.thumbnail[0];

    if (images.length === 0 && !thumbnailLocalFilePath) {
        throw new BadRequestException('No images or thumbnail provided');
    }

    const jobData:JobData = {
        productData: body,
        files: {
            thumbnailPath: thumbnailLocalFilePath?.path,
            imagesPaths: images.map((img) => img?.path),
            videoPaths: videos.map((video) => video?.path),
    },
};

    if (videos.length === 0) {
        delete jobData.files.videoPaths;
        Logger.warn('No videos provided');
    }
    await productQueue.add('create-product-job', jobData, {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000,
    },
        removeOnComplete: true,
        removeOnFail: false,
    });

    Logger.info('Product creation job added to queue');
};
}

const productServices = new ProductServices();
export default productServices;
