import { Request, Response } from "express";
import crypto from "crypto";
import Otp from "../../../models/otpSchema";
import { sendOtpEmail } from "../../../service/emailHelper";
import User from "../../../models/userSchema";
const OTP_LIMIT = 5;
const OTP_WINDOW_HOURS = 3;
const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already registered",
      });
    }

    const windowStart = new Date(
      Date.now() - OTP_WINDOW_HOURS * 60 * 60 * 1000
    );

    const otpCount = await Otp.countDocuments({
      email,
      createdAt: { $gte: windowStart },
    });

    if (otpCount >= OTP_LIMIT) {
      return res.status(429).json({
        message: "OTP limit exceeded. Try again after 3 hours.",
      });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    await Otp.deleteMany({ email });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await Otp.create({
      email,
      otp,
      expiresAt,
    });

    // Send OTP email
    await sendOtpEmail(email, otp);
    console.log("OTP:", otp);

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
};

//VERIFY OTP (controller-only usage)
const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOneAndUpdate(
      { email, otp, isVerified: false },
      { isVerified: true },
      { new: true }
    );

    if (!record) {
      return res.status(400).json({
        message: "Invalid, expired, or already used OTP",
      });
    }

    await Otp.deleteMany({ email });

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

export { sendOtpController, verifyOtpController };
