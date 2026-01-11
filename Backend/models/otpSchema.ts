import mongoose, { Document } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  isVerified: boolean;
  expiresAt: Date;
}

const otpSchema = new mongoose.Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * ⏱ Auto-delete OTP after expiry
 * MongoDB TTL index
 */
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model<IOtp>("Otp", otpSchema);
export default Otp;
