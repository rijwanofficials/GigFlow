import { Response } from "express";
import Notification from "../../../models/notificationSchema";
import { AuthRequest } from "../user/middleware";
import { getAuthUserId } from "../helpers/authHelper";

export const getMyNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = getAuthUserId(req);

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: notifications,
  });
};
