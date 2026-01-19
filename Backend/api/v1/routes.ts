import { Router } from "express";
import { authRouter } from "./auth/routes";
import otpRouter from "./otp/routes";
import userRouter from "./user/routes";
import gigRoutes from "./gig/routes";
import bidRoutes from "./bid/routes";
import { notificationRoutes } from "./notification/routes";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/otps", otpRouter);
apiRouter.use("/gigs", gigRoutes);
apiRouter.use("/bids", bidRoutes);
apiRouter.use("/notifications", notificationRoutes);

export { apiRouter };
