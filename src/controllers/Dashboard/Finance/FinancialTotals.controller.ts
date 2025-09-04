import { Request, Response } from "express";
import getFinancialTotals from "../../../DB/dashboardShowTotal";

const getAllFinanceTotals = async (req: Request, res: Response) => {
  try {
    const totals = await getFinancialTotals();
    res.status(200).json({
      success: true,
      totals,
    });
  } catch (err) {
    console.error("Error fetching Totals:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default getAllFinanceTotals;
