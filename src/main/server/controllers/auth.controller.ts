import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../utils/common.util";
import { registerSchema } from "../utils/validation-schema.util";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = registerSchema.parse(req.body);
  const userExists = await User.exists({ email });
  if (userExists)
    return res
      .status(400)
      .json({ success: false, message: "This email is already in use." });
  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ success: true, message: "User Registered Successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Invalid Credentials" });
  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json("Invalid Credentials");
  const token = generateToken({ id: user._id });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ success: true, message: "Logged in Successfully" });
};

export const logout = (req: Request, res: Response) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged Out Successfully" });
};
