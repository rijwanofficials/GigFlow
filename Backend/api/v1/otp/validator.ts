import { Request, Response, NextFunction } from "express";

const sendOtpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  next();
};

const verifyOtpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Email and OTP are required",
    });
  }

  next();
};

export { sendOtpValidator, verifyOtpValidator };