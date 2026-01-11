import { Request, Response, NextFunction } from "express";
import Otp from "../../../models/otpSchema";

const verifyOtpMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const record = await Otp.findOneAndUpdate(
      { email, otp, isVerified: false },
      { isVerified: true },
      { new: true }
    );

    if (!record) {
      return res.status(401).json({
        message: "Invalid, expired, or already used OTP",
      });
    }

    // strict one-time use
    await Otp.deleteMany({ email });

    next();
  } catch (error) {
    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

export { verifyOtpMiddleware };
