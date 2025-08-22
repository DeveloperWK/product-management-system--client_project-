import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getActiveProducts,
  getAllProducts,
  getProductById,
  getProductBySku,
  updateProduct,
} from '../controllers/Products/Product.controller';

const router = Router();

router.post('', createProduct);
router.get('', getAllProducts);
router.get('/sku/:sku', getProductBySku);
router.get('/active', getActiveProducts);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
