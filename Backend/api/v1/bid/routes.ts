import { Router } from "express";
import { authMiddleware } from "../user/middleware";
import { createBidValidator } from "./Validator";
import { createBid, getBidsForGig, getMyBids, hireBid } from "./Controller";

const bidRoutes = Router();

// CREATE BID
bidRoutes.post("/", authMiddleware, createBidValidator, createBid);

// 🔥 STATIC ROUTES FIRST
bidRoutes.get("/my", authMiddleware, getMyBids);

// HIRE BID
bidRoutes.patch("/:bidId/hire", authMiddleware, hireBid);

// 🔥 DYNAMIC ROUTES LAST
bidRoutes.get("/:gigId", authMiddleware, getBidsForGig);

export default bidRoutes;
