import { Response, NextFunction } from "express";
import { AuthRequest } from "../user/middleware";

export const createGigValidator = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description, budget } = req.body;

  if (!title || !description || !budget) {
    return res.status(400).json({
      message: "Title, description and budget are required",
    });
  }

  if (typeof budget !== "number" || budget <= 0) {
    return res.status(400).json({
      message: "Budget must be a positive number",
    });
  }

  next();
};
