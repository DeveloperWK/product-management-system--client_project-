import { Router } from 'express';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from '../controllers/Purchase/Supplier.controller';

const router = Router();

router.post('', createSupplier);
router.get('', getAllSuppliers);
router.get('/:id', getSupplierById);
router.patch('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
