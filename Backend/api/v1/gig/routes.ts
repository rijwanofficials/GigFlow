import { Router } from "express";
import { authMiddleware } from "../user/middleware";
import { createGig, getOpenGigs } from "./Controller";
import { createGigValidator } from "./Validation";

const gigRoutes = Router();
gigRoutes.post("/", authMiddleware, createGigValidator, createGig);
gigRoutes.get("/", getOpenGigs);
export default gigRoutes;