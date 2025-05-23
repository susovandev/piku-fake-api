import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Product } from '@/models/index.js';
import { IProduct } from '@/types/index.js';
import { ApiResponse, BadRequestException, Logger } from '@/utils/index.js';
import { TryCatchHandler } from '@/utils/index.js';
import { productQueue } from '@/jobs/queue/product.queue.js';

class ProductController {
  getAllProducts = TryCatchHandler(async (req: Request, res: Response) => {
    res.send('All products');
  });

  getProductById = TryCatchHandler(
    async (req: Request<{ productId: string }>, res: Response) => {
      const { productId } = req.params;
      Logger.info(`Fetching product by ID: ${productId}`);

      const product = await Product.findById(productId);
      if (!product) {
        Logger.warn(`Product not found for ID: ${productId}`);
        throw new BadRequestException('Product not found with the provided ID');
      }

      Logger.info(`Product retrieved successfully for ID: ${productId}`);

      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            'Product retrieved successfully',
            product,
          ),
        );
    },
  );

  createProduct = TryCatchHandler(
    async (req: Request<object, object, Partial<IProduct>>, res: Response) => {
      Logger.info('Attempting to create a new product');

      // Get files and data from the request
      const files = req.files as Record<string, Express.Multer.File[]>;
      const images = files?.images || [];
      const videos = files?.videos || [];
      const thumbnailLocalFilePath = files?.thumbnail[0];

      if (images.length === 0 && !thumbnailLocalFilePath) {
        throw new BadRequestException('No images or thumbnail provided');
      }

      const jobData: {
        productData: Partial<IProduct>;
        files: {
          thumbnailPath: string;
          imagesPaths: string[];
          videoPaths?: string[];
        };
      } = {
        productData: req.body,
        files: {
          thumbnailPath: thumbnailLocalFilePath?.path,
          imagesPaths: images.map((img) => img?.path),
          videoPaths: videos.map((video) => video?.path),
        },
      };

      await productQueue.add('create-product-job', jobData, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      });

      return res
        .status(StatusCodes.ACCEPTED)
        .json(
          new ApiResponse(
            StatusCodes.ACCEPTED,
            'Product creation is in progress',
          ),
        );
    },
  );
}

const productController = new ProductController();
export default productController;
