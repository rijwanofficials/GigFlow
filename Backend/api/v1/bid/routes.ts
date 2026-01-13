import { Router } from "express";
import { authMiddleware } from "../user/middleware";
import { createBidValidator } from "./Validator";
import { createBid, getBidsForGig, hireBid } from "./Controller";

const bidRoutes = Router();

bidRoutes.post("/", authMiddleware, createBidValidator, createBid);

bidRoutes.get("/:gigId", authMiddleware, getBidsForGig);

bidRoutes.patch("/:bidId/hire", authMiddleware, hireBid);

export default bidRoutes;
