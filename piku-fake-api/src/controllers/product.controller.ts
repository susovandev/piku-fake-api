import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Product } from '@/models/index.js';
import { IProduct } from '@/types/index.js';
import { ApiResponse, BadRequestException, InternalServerException, Logger } from '@/utils/index.js';
import { TryCatchHandler } from '@/utils/index.js';

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

      const {
        user,
        title,
        description,
        category,
        price,
        discountPercentage,
        stock,
        tags,
        brand,
        sku,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        reviews,
        returnPolicy,
        minimumOrderQuantity,
      } = req.body;
      const product: IProduct = await Product.create({
        user,
        title,
        description,
        category,
        price,
        discountPercentage,
        stock,
        tags,
        brand,
        sku,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        reviews,
        returnPolicy,
        minimumOrderQuantity,
        images: [
          'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png',
        ],
        videoUrl:
          'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png',
        thumbnail:
          'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.png',
      });

      if (!product) {
        Logger.warn('Failed to create product');
        throw new InternalServerException(
          'Failed to create product due to a server error',
        );
      }

      Logger.info(`Product created successfully: ${product._id}`);

      res
        .status(StatusCodes.CREATED)
        .json(
          new ApiResponse(
            StatusCodes.CREATED,
            'Product created successfully',
            product,
          ),
        );
    },
  );
}

const productController = new ProductController();
export default productController;
