import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    iat?: number;
    exp?: number;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("=== AUTH START ===");
    const token = req.cookies?.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthRequest["user"];

    req.user = decoded;
    console.log("in middleware", req.user);

    next();
  } catch (error) {
    // 6️⃣ Token invalid / expired
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
