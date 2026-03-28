import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../models/User";

export type AuthRequest = Request & { userId?: string };

export const protectedRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId: clerkId } = getAuth(req);
    if (!clerkId)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    req.userId = user._id.toString();
    return next();
  } catch (error) {
    return next(error);
  }
};
