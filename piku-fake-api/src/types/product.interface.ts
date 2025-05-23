import { Document, ObjectId } from 'mongoose';

export interface IReviews {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}
export interface IProduct extends Document {
  _id: ObjectId;
  user: ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReviews[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  video: string[];
  isPublished: boolean;
  isFeatured: boolean;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}
