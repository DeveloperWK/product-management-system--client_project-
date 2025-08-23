import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpense,
  updateExpense,
} from "../controllers/Purchase/Expense.controller";

const router = Router();

router
  .post("", createExpense)
  .get("", getAllExpense)
  .put("/:id", updateExpense)
  .delete("/:id", deleteExpense);

export default router;
