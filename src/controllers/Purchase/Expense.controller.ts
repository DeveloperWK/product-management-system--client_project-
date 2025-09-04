import { Request, Response } from 'express';
import ExpenseOperations from '../../DB/Expense';

const getAllExpense = async (_req: Request, res: Response) => {
  try {
    const expenses = await ExpenseOperations.getAll();
    res.status(200).json({
      expenses,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

const createExpense = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const expense = await ExpenseOperations.create(name);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to create expense" });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await ExpenseOperations.update(id, data);
    res.status(200).json({ msg: "Update Successful" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "expense not found" });
    }
    res.status(500).json({ error: "Failed to update expense" });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ExpenseOperations.delete(id);
    res.status(200).json({
      message: "Delete Successful",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "expense not found" });
    }
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
export { createExpense, deleteExpense, getAllExpense, updateExpense };
