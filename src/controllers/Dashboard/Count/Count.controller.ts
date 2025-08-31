import { Request, Response } from "express";
import getCounts from "../../../DB/Count";

const getAllCount = async (req: Request, res: Response) => {
  try {
    const counts = await getCounts();
    res.status(200).json({
      success: true,
      counts,
    });
  } catch (err) {
    console.error("Error fetching Counts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default getAllCount;
