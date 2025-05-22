import { Document, ObjectId } from 'mongoose'

interface IDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface IReviews {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}
export interface IProduct extends Document {
    _id: ObjectId;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IReviews[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    images: string[];
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
}
