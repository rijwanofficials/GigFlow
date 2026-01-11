import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import User from "../../../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signupController = async (req: Request, res: Response) => {
  try {
    console.log("Inside the signup controller");
    const { name, email, password } = req.body;

    // 2️⃣ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3️⃣ Create new user
    const user = await User.create({
      name,
      email,
      password, // (we will hash later)
    });

    res.status(201).json({
      message: "User signed up successfully",
      userId: user._id,
    });
  } catch (err) {
    console.error("Error in signupController:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password"
    );
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 🔐 Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } as jwt.SignOptions
    );

    // 🍪 Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

const logoutController = (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};

export { signupController, loginController, logoutController };
