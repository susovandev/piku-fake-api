import Joi from 'joi';

const dimensionsSchemaValidate = Joi.object({
  width: Joi.number().required(),
  height: Joi.number().required(),
  depth: Joi.number().required(),
});

const reviewsSchemaValidate = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
  date: Joi.date()
    .default(() => new Date())
    .required(),
  reviewerName: Joi.string().required(),
  reviewerEmail: Joi.string().email().required(),
});

const createProductSchemaValidate = Joi.object({
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  title: Joi.string().trim().min(3).max(150).required(),
  description: Joi.string().trim().min(10).max(500).required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  discountPercentage: Joi.number().min(0).max(100).required(),
  rating: Joi.number().min(1).max(5).optional(),
  stock: Joi.number().integer().min(1).required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  brand: Joi.string().trim().required(),
  sku: Joi.string().trim().alphanum().required(),
  weight: Joi.number().positive().required(),
  dimensions: dimensionsSchemaValidate.required(),
  warrantyInformation: Joi.string().required(),
  shippingInformation: Joi.string().required(),
  availabilityStatus: Joi.string()
    .valid('In Stock', 'Out of Stock', 'Discontinued')
    .required(),
  reviews: Joi.array().items(reviewsSchemaValidate).optional(),
  returnPolicy: Joi.string().required(),
  minimumOrderQuantity: Joi.number().integer().min(1).default(1),
  images: Joi.array()
    .items(
      Joi.string()
        .uri()
        .pattern(/\.(jpg|jpeg|png|webp|gif)$/),
    )
    .min(1)
    .required(),
  thumbnail: Joi.string().uri().required(),
  videoUrl: Joi.string().uri().optional(),
  isPublished: Joi.boolean().default(false),
  isFeatured: Joi.boolean().default(false),
});

export { createProductSchemaValidate };
