import { Router } from "express";
import { authMiddleware } from "./middleware";
import upload from "../middleware/upload";
import { getProfileController, uploadAvatarController } from "./controller";


const router = Router();

router.get("/profile", authMiddleware, getProfileController);

router.post(
  "/avatar",authMiddleware,
  upload.single("avatar"),
  uploadAvatarController
);

export default router;
