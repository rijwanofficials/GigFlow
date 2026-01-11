import { Router } from "express";
import { authRouter } from "./auth/routes";
import otpRouter from "./otp/routes";
import userRouter from "./user/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/otps", otpRouter);

export { apiRouter };
