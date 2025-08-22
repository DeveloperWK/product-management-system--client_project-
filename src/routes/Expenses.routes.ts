import { Router } from 'express';
import { createExpense, deleteExpense, getAllExpense, updateExpense } from '../controllers/Purchase/Expense.controller';

const router = Router();

router.post('', createExpense);
router.get('', getAllExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
