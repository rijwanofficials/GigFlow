import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * We extend Express Request to add `user`
 * so TypeScript knows req.user exists
 */
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
    // 1️⃣ Read JWT from HTTP-only cookie
    const token = req.cookies?.token;
    console.log(req.cookies);
    console.log({ token });

    // 2️⃣ If token not present → user is not logged in
    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // 3️⃣ Verify token using JWT secret
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthRequest["user"];

    // 4️⃣ Attach decoded payload to request object
    req.user = decoded;

    // 5️⃣ Allow request to continue
    next();
  } catch (error) {
    // 6️⃣ Token invalid / expired
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
