import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["hired"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    meta: {
      gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
