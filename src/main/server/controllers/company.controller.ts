import { Request, Response } from "express";
import Company from "../models/company.model";
import { companySchema } from "../utils/validation-schema.util";
import ApiError from "../utils/custom-error.util";
import { IProduct } from "../models/product.model";

// Create Company
export const createCompany = async (req: Request, res: Response) => {
  const parsed = companySchema.parse(req.body);
  const company = await Company.create(parsed);
  const populatedCompany = await Company.findById(company._id)
    .populate<{ products: IProduct[] }>("products")
    .lean();
  res.status(201).json({ success: true, data: populatedCompany });
};

// Get All Companies
export const getCompanies = async (req: Request, res: Response) => {
  const companies = await Company.find()
    .populate<{ products: IProduct[] }>("products")
    .lean();
  res.json({ success: true, data: companies });
};

// Get Company by Id
export const getCompanyById = async (req: Request, res: Response) => {
  const company = await Company.findById(req.params.id)
    .populate<{ products: IProduct[] }>("products")
    .lean();
  if (!company) throw new ApiError("Company not found", 404);
  res.json({ success: true, data: company });
};

// Update Company
export const updateCompany = async (req: Request, res: Response) => {
  const parsed = companySchema.partial().parse(req.body);
  const company = await Company.findByIdAndUpdate(req.params.id, parsed, {
    new: true,
  }).populate<{ products: IProduct[] }>("products");
  if (!company) throw new ApiError("Company not found", 404);
  res.json({ success: true, data: company });
};

// Delete Company
export const deleteCompany = async (req: Request, res: Response) => {
  const company = await Company.findByIdAndDelete(req.params.id);
  if (!company) throw new ApiError("Company not found", 404);
  res.json({ success: true, message: "Company deleted Successfully" });
};
