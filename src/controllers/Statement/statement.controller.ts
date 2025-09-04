import { Request, Response } from "express";
import getStatementReport from "../../DB/getStatementReport";

export const getStatement = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate date format if provided
    let start: string | undefined;
    let end: string | undefined;

    if (startDate && typeof startDate === "string") start = startDate;
    if (endDate && typeof endDate === "string") end = endDate;

    // Call the report service
    const report = await getStatementReport(start, end);

    return res.status(200).json({
      status: "success",
      data: report,
    });
  } catch (err) {
    console.error("Error fetching statement report:", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while generating the statement report",
    });
  }
};
export default getStatement;
