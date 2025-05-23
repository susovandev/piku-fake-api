import { Router } from 'express';
import { upload } from '@/config/index.js';
import { productController } from '@/controllers/index.js';
import { validateRequest } from '@/middleware/index.js';
import { createProductSchemaValidate } from '@/validation/index.js';

const router: Router = Router();

router
  .route('/')
  .post(
    upload.fields([
      { name: 'videos', maxCount: 2 },
      { name: 'images', maxCount: 5 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    validateRequest(createProductSchemaValidate),
    productController.createProduct,
  )
  .get(productController.getAllProducts);

export default router;
