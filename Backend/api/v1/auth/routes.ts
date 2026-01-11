import { Router } from "express";
import { loginController, logoutController, signupController } from "./controller";
import { loginValidator, signupValidator } from "./validator";
import { verifyOtpMiddleware } from "../middleware/otpMiddleware";

const authRouter = Router();

authRouter.post(
  "/signup",
  signupValidator,
  verifyOtpMiddleware,
  signupController
);
authRouter.post("/login", loginValidator, loginController);

authRouter.post("/logout", logoutController);
export { authRouter };
