import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  purchaseRate: number;
  saleRate: number;
  mrp: number;
  spRate?: number;
  company: Types.ObjectId;
  group: Types.ObjectId;
  imagePath?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    purchaseRate: { type: Number, required: true },
    saleRate: { type: Number, required: true },
    mrp: { type: Number, required: true },
    spRate: { type: Number },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    imagePath: { type: String },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
