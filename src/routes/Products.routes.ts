import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getActiveProducts,
  getAllProducts,
  getLowStockProducts,
  getProductById,
  getProductBySku,
  updateProduct,
} from '../controllers/Products/Product.controller';

const router = Router();

router
  .post("", createProduct)
  .get("", getAllProducts)
  .get("/low-stock", getLowStockProducts)
  .get("/sku/:sku", getProductBySku)
  .get("/active", getActiveProducts)
  .get("/:id", getProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
