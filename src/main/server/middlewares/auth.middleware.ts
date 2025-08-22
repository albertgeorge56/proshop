import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/custom-error.util";
import { verifyToken } from "../utils/common.util";
import User from "../models/user.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) throw new ApiError("No token provided");
  const payload = verifyToken<{ id: string }>(token);
  if (!payload) throw new ApiError("Invalid/Expired Token");
  req.user = await User.findById(payload.id);
  next();
};
