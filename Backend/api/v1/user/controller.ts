import { Response } from "express";
import { AuthRequest } from "./middleware";
import User from "../../../models/userSchema";
import cloudinary from "../../../config/cloudinary";

export const uploadAvatarController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized,cannot upload picture,login first",
      });
    }

    const file = req.file;
    // console.log("FILE:", file);

    if (file === undefined) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "ai-docs/avatars",
            transformation: [{ width: 256, height: 256, crop: "fill" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(file.buffer);
    });

    /* ---------- Save URL in MongoDB ---------- */
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploadResult.secure_url },
      { new: true }
    ).select("_id name email role avatar");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email, role, avatar } = user;
    // console.log(user.avatar);

    return res.status(200).json({
      message: "Avatar uploaded successfully",
      user: {
        id: user._id.toString(),
        name,
        email,
        role,
        avatar,
      },
    });
  } catch (error) {
    console.error("❌ Avatar upload error:", error);
    return res.status(500).json({
      message: "Avatar upload failed",
    });
  }
};

export const getProfileController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Profile error:", error);
    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};
