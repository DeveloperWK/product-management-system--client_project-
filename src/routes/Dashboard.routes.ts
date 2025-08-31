import { Router } from "express";
import getAllCount from "../controllers/Dashboard/Count/Count.controller";
import getAllFinanceTotals from "../controllers/Dashboard/Finance/FinancialTotals.controllers";

const router = Router();

router.get("/counts", getAllCount).get("/finance-total", getAllFinanceTotals);

export default router;
