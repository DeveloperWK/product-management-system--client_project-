import { Router } from 'express';
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  updateStore,
} from '../controllers/Products/Store.controller';

const router = Router();

router.post('', createStore);
router.get('', getAllStores);
router.get('/:id', getStoreById);
router.patch('/:id', updateStore);
router.delete('/:id', deleteStore);

export default router;
