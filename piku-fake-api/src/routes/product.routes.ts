import { Router } from 'express';
import { productController } from '@/controllers/index.js';
import { validateRequest } from '@/middleware/index.js';
import { createProductSchemaValidate } from '@/validation/index.js';

const router = Router();

router
  .route('/')
  .post(
    validateRequest(createProductSchemaValidate),
    productController.createProduct,
  )
  .get(productController.getAllProducts);

router.route('/:productId').get(productController.getProductById);

export default router;
