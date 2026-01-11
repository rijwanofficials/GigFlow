import { Router } from "express";
import { sendOtpValidator, verifyOtpValidator } from "./validator";
import { sendOtpController, verifyOtpController } from "./controller";

const otpRouter = Router();

// send OTP
otpRouter.post("/send", sendOtpValidator, sendOtpController);

// verify OTP (standalone)

otpRouter.post("/verify", verifyOtpValidator, verifyOtpController);

export default otpRouter;
