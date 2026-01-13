import { AuthRequest } from "../user/middleware";

export const getAuthUserId = (req: AuthRequest): string => {
  if (!req.user) {
    throw new Error("Unauthenticated request");
  }

  return req.user.userId;
};
