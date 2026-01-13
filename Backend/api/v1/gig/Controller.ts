import { Request, Response } from "express";
import Gig from "../../../models/gigSchema";
import { getAuthUserId } from "../helpers/authHelper";

//CREATE GIG
//POST /api/v1/gigs

export const createGig = async (req: Request, res: Response) => {
  try {
    const { title, description, budget } = req.body;
    const ownerId = getAuthUserId(req);

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: ownerId,
    });

    res.status(201).json({
      success: true,
      message: "Gig created successfully",
      data: gig,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create gig" });
  }
};

// GET OPEN GIGS
export const getOpenGigs = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const filter: any = { status: "open" };
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    const gigs = await Gig.find(filter)
      .sort({ createdAt: -1 })
      .populate("ownerId", "name email");
    res.json({
      success: true,
      message: "Open gigs fetched successfully",
      data: gigs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};
