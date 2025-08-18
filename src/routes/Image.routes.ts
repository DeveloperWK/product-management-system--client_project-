import { Router } from 'express';
import upload from '../config/multer.config';
import {
  addProductImages,
  createProductImage,
  deleteProductImage,
  deleteProductImagesBatch,
  getAllProductImages,
  getProductImageById,
  getProductImagesByProductId,
  getProductImagesByProductIds,
  replaceProductImages,
  updateProductImage,
  upsertProductImages,
} from '../controllers/Products/Image.controller';

const router = Router();

// Single image operations
router.get('', getAllProductImages);
router.get('/:id', getProductImageById);
router.get('/product/:productId', getProductImagesByProductId);
router.post('', upload.single('image'), createProductImage);
router.put('/:id', upload.single('image'), updateProductImage);
router.delete('/:id', deleteProductImage);

// Bulk operations for a single product
router.put(
  '/product/:productId',
  upload.array('images', 10),
  replaceProductImages,
); // Replace all
router.post(
  '/product/:productId/add',
  upload.array('images', 10),
  addProductImages,
); // Add more
router.patch(
  '/product/:productId',
  upload.array('images', 10),
  upsertProductImages,
); // Upsert

// Batch operations
router.delete('/batch/delete', deleteProductImagesBatch); // Delete multiple
router.get('/batch/product', getProductImagesByProductIds); // Get by multiple product IDs

export default router;
