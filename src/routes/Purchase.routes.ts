import { Router } from 'express';
import {
  createPurchase,
  deletePurchase,
  getAllPurchaseWithFilters,
  getPurchaseById,
  getPurchaseByProductId,
  getPurchaseByStatus,
  getPurchaseByStoreId,
  getPurchaseByWarehouseId,
  getPurchaseStats,
  searchPurchase,
  updatePurchase,
  updatePurchaseStatus,
} from '../controllers/Purchase/Purchase.controller';

const router = Router();

router.post('', createPurchase);
router.get('', getAllPurchaseWithFilters);
router.get('/search', searchPurchase);
router.get('/stats/summary', getPurchaseStats);
router.get('/:id', getPurchaseById);
router.get('/store/:storeId', getPurchaseByStoreId);
router.get('/warehouse/:warehouseId', getPurchaseByWarehouseId);
router.get('/product/:productId', getPurchaseByProductId);
router.get('/status/:status', getPurchaseByStatus);
router.patch('/:id', updatePurchase);
router.patch('/:id/status', updatePurchaseStatus);
router.delete('/:id', deletePurchase);

export default router;
