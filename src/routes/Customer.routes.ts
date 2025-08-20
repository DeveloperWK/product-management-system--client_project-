import { Router } from 'express';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} from '../controllers/Customer/customer.controller';

const router = Router();

router.post('', createCustomer);
router.get('', getAllCustomer);
router.get('/:id', getCustomerById);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
