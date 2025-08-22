import { z } from "zod";

// Register/Signup Schema
export const registerSchema = z.object({
  name: z.string().trim().min(2, "Provide a name"),
  email: z.email("Provide a valid email"),
  password: z.string().min(4, "Provide a Password of minimum four characters"),
});

// Login Schema
export const loginSchema = z.object({
  email: z.email("Provide a valid email"),
  password: z.string().min(4, "Provide a Password of minimum four characters"),
});

// Company Schema
export const companySchema = z.object({
  name: z.string().min(2, "Name is required"),
  shortname: z.string().min(1, "Short name is required"),
  active: z.coerce.boolean().optional(),
});

// Group Schema
export const groupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  active: z.coerce.boolean().optional(),
});

// Product Schema
export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  purchaseRate: z.coerce.number().min(0, "Purchase rate must be >= 0"),
  saleRate: z.coerce.number().min(0, "Sale rate must be >= 0"),
  mrp: z.coerce.number().min(0, "MRP must be >= 0"),
  spRate: z.coerce.number().min(0, "Special price must be >= 0"),
  imagePath: z.string().optional(),
  company: z.string().min(1, "Company ID is required"),
  group: z.string().min(1, "Group ID is required"),
});
