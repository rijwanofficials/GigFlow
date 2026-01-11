import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "USER" | "VERIFIER" | "ADMIN";
  isActive: boolean;
  avatar?: string;
  phone?: string;
  location?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["USER", "VERIFIER", "ADMIN"],
      default: "USER",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },    
    phone: {
      type: String,
      trim: true, 
    },
    location: {
      type: String,
      trim: true, 
    },
  },
  {
    timestamps: true,
  }
);


//  * 🔐 Pre-save hook for password hashing TypeScript-safe
userSchema.pre<IUser>("save", async function () {
  // `this` is now properly typed as IUser
  if (!this.isModified("password")) return;

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
