import { Request, Response } from "express";
import Group from "../models/group.model";
import { groupSchema } from "../utils/validation-schema.util";
import ApiError from "../utils/custom-error.util";
import { IProduct } from "../models/product.model";

// Create Group
export const createGroup = async (req: Request, res: Response) => {
  const parsed = groupSchema.parse(req.body);
  const group = await Group.create(parsed);
  const populatedGroup = await Group.findById(group._id)
    .populate<{ products: IProduct[] }>("products")
    .lean();
  res.status(201).json({ success: true, data: populatedGroup });
};

// Get All Groups (populate products)
export const getGroups = async (req: Request, res: Response) => {
  const groups = await Group.find()
    .populate<{ products: IProduct[] }>("products")
    .lean();
  res.json({ success: true, data: groups });
};

// Get Group by ID (populate products)
export const getGroupById = async (req: Request, res: Response) => {
  const group = await Group.findById(req.params.id)
    .populate<{ products: IProduct[] }>("products")
    .lean();
  if (!group) throw new ApiError("Group not found", 404);
  res.json({ success: true, data: group });
};

// Update Group (populate products)
export const updateGroup = async (req: Request, res: Response) => {
  const parsed = groupSchema.partial().parse(req.body);
  const group = await Group.findByIdAndUpdate(req.params.id, parsed, {
    new: true,
  }).populate<{ products: IProduct[] }>("products");
  if (!group) throw new ApiError("Group not found", 404);
  res.json({ success: true, data: group });
};

// Delete Group
export const deleteGroup = async (req: Request, res: Response) => {
  const group = await Group.findByIdAndDelete(req.params.id);
  if (!group) throw new ApiError("Group not found", 404);
  res.json({ success: true, message: "Group deleted" });
};
