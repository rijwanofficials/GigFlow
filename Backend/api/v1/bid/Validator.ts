import { Response, NextFunction } from "express";
import { AuthRequest } from "../user/middleware";

export const createBidValidator = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { gigId, message, price } = req.body;

  if (!gigId || !message || !price) {
    return res.status(400).json({
      message: "GigId, message and price are required",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive number",
    });
  }

  next();
};
