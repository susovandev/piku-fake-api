import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '@/types/index.js';
import { ApiResponse, Logger } from '@/utils/index.js';
import { TryCatchHandler } from '@/utils/index.js';
import { productServices } from '@/services/index.js';

class ProductController {
  getAllProducts = TryCatchHandler(async (req: Request, res: Response) => {
    res.send('All products');
  });

  getProductById = TryCatchHandler(
    async (req: Request<{ productId: string }>, res: Response) => {
      Logger.info('Attempting to retrieve a product by ID');

      const { productId } = req.params;
      const product = await productServices.getProductByIdService(productId);

      // Return a success response
      res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            'Product retrieved successfully',
            product,
          ),
        );
      Logger.info(`Product retrieved successfully for ID: ${productId}`);
    },
  );

  createProduct = TryCatchHandler(
    async (req: Request<object, object, Partial<IProduct>>, res: Response) => {
      Logger.info('Attempting to create a new product');

      // Call the service to create a new product
      await productServices.createNewProductService(
        req.body,
        req.files as Record<string, Express.Multer.File[]>,
      );

      // Return a success response
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
