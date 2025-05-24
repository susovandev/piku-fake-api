import { Schema, model } from 'mongoose';
import { IProduct, IReviews } from '@/types/index.js';

const reviewsSchema: Schema<IReviews> = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
});

const productSchema: Schema<IProduct> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Discontinued'],
      default: 'In Stock',
      required: true,
    },
    reviews: { type: [reviewsSchema], required: true },
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true, default: 1 },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) =>
          arr.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(url),
          ),
        message: 'All image URLs must be valid and end with image extensions.',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url: string) =>
          /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(url),
        message: 'Thumbnail must be a valid image URL.',
      },
    },
    video: {
      type: [String],
    },
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
