import { Response } from "express";
import Gig from "../../../models/gigSchema";
import Bid from "../../../models/bidSchema";
import { AuthRequest } from "../user/middleware";
import { getAuthUserId } from "../helpers/authHelper";
import mongoose from "mongoose";
import Notification from "../../../models/notificationSchema";

//Submit a bid

export const createBid = async (req: AuthRequest, res: Response) => {
  try {
    const { gigId, message, price } = req.body;
    const freelancerId = getAuthUserId(req);
    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // ❌ Can't bid on assigned gig
    if (gig.status === "assigned") {
      return res.status(400).json({
        message: "This gig is already assigned",
      });
    }

    // ❌ Owner cannot bid on own gig
    if (gig.ownerId.toString() === freelancerId) {
      return res.status(403).json({
        message: "You cannot bid on your own gig",
      });
    }

    // ❌ Prevent multiple bids by same user
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId,
    });

    if (existingBid) {
      return res.status(400).json({
        message: "You have already placed a bid on this gig",
      });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId,
      message,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Bid submitted successfully",
      data: bid,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit bid" });
  }
};

// Get all bids for a gig (owner only)

export const getBidsForGig = async (req: AuthRequest, res: Response) => {
  try {
    const { gigId } = req.params;
    const userId = getAuthUserId(req);

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.ownerId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to view these bids",
      });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bids,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

import { getIO } from "../../../socket";
// Hire a bid
export const hireBid = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;
    const userId = getAuthUserId(req);

    // 1️⃣ Find bid
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      throw new Error("Bid not found");
    }

    // 2️⃣ Find gig
    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error("Gig not found");
    }

    // 3️⃣ Only owner can hire
    if (gig.ownerId.toString() !== userId) {
      throw new Error("Not authorized to hire");
    }

    // 4️⃣ Prevent double hiring
    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    // 5️⃣ Update gig
    gig.status = "assigned";
    await gig.save({ session });

    // 6️⃣ Hire selected bid
    bid.status = "hired";
    await bid.save({ session });

    // 7️⃣ Reject others
    await Bid.updateMany(
      { gigId: bid.gigId, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Notify freelancer via Socket.io
    const io = getIO();

    // after successful transaction commit
    await Notification.create({
      userId: bid.freelancerId,
      type: "hired",
      message: `You have been hired for "${gig.title}"`,
      meta: {
        gigId: gig._id,
      },
    });

    // emit socket event
    io.to(bid.freelancerId.toString()).emit("hired", {
      gigId: gig._id,
      title: gig.title,
      message: "You have been hired",
    });

    return res.json({
      success: true,
      message: "Freelancer hired successfully",
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    return res.status(400).json({
      success: false,
      message: error.message || "Hiring failed",
    });
  }
};

export const getMyBids = async (req: AuthRequest, res: Response) => {
  try {
    console.log("----i am inside getMyBids Controller---");
    const userId = getAuthUserId(req);
    console.log("user id on getMyBids:", userId);

    const bids = await Bid.find({
      freelancerId: new mongoose.Types.ObjectId(userId),
    })
      .populate("gigId", "title status")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("GET MY BIDS ERROR", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch your bids",
    });
  }
};
