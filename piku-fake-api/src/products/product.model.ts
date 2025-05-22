import { Schema, model } from 'mongoose'
import { IProduct, IReviews } from '@/products/product.interface.js'

const reviewsSchema: Schema<IReviews> = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true }
})

const productSchema: Schema<IProduct> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: Object, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: { type: [reviewsSchema], required: true },
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
}, { timestamps: true })

export const Product = model<IProduct>('Product', productSchema)