import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getActiveProducts,
  getAllProducts,
  getProductByCategory,
  getProductById,
  getProductBySku,
  updateProduct,
} from "../controllers/Products/Product.controller";

const router = Router();

router
  .post("", createProduct)
  .get("", getAllProducts)
  .get("/sku/:sku", getProductBySku)
  .get("/category/:categoryId", getProductByCategory)
  .get("/active", getActiveProducts)
  .get("/:id", getProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

export default router;
