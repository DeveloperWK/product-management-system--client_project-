import { Router } from 'express';
import {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouses,
  getWarehouseById,
  updateWarehouse,
} from '../controllers/Products/Warehouse.controller';

const router = Router();

router.post('', createWarehouse);
router.get('', getAllWarehouses);
router.get('/:id', getWarehouseById);
router.put('/:id', updateWarehouse);
router.delete('/:id', deleteWarehouse);

export default router;
