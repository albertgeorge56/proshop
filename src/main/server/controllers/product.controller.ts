import { Request, Response } from "express";
import Product from "../models/product.model";
import { productSchema } from "../utils/validation-schema.util";
import ApiError from "../utils/custom-error.util";

// Create Product with image upload
export const createProduct = async (req: Request, res: Response) => {
  // Multer puts the file info in req.file
  const file = req.file as Express.Multer.File | undefined;
  const imagePath = file?.filename ? `/uploads/${file.filename}` : undefined;
  const parsed = productSchema.parse({ ...req.body, imagePath });
  const product = await Product.create(parsed);
  res.status(201).json({ success: true, data: product });
};

// Get All Products
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find()
    .populate("company")
    .populate("group")
    .lean();
  res.json({ success: true, data: products });
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id)
    .populate("company")
    .populate("group")
    .lean();
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, data: product });
};

// Update Product (with optional image upload)
export const updateProduct = async (req: Request, res: Response) => {
  const imagePath = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.imagePath;
  const parsed = productSchema.partial().parse({ ...req.body, imagePath });
  const product = await Product.findByIdAndUpdate(req.params.id, parsed, {
    new: true,
  });
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, data: product });
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) throw new ApiError("Product not found", 404);
  res.json({ success: true, message: "Product deleted" });
};
