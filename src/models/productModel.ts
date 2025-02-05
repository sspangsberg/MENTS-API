import { Schema, model } from 'mongoose';
import { Product } from '../interfaces/product';

const productSchema = new Schema<Product>({
    name: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: false, min: 6, max: 255 },
    imageURL: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    isOnDiscount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0 },
    isHidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: 'User', required: true }
});

export const productModel = model<Product>('Product', productSchema);