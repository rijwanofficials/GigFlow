const express = require("express");
import { Router } from "express";
import { authMiddleware } from "../user/middleware";
import { getMyNotifications } from "./Controller";
export const notificationRoutes = Router();

notificationRoutes.get("/my", authMiddleware, getMyNotifications);
