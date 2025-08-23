import { Router } from "express";
import upload from "../config/multer.config";
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
} from "../controllers/Products/Image.controller";

const router = Router();

// Single image operations
router
  .get("", getAllProductImages)
  .get("/:id", getProductImageById)
  .get("/product/:productId", getProductImagesByProductId)
  .post("", upload.single("image"), createProductImage)
  .put("/:id", upload.single("image"), updateProductImage)
  .delete("/:id", deleteProductImage);

// Bulk operations for a single product
router
  .put("/product/:productId", upload.array("images", 10), replaceProductImages) // Replace all
  .post("/product/:productId/add", upload.array("images", 10), addProductImages) // Add more
  .patch(
    "/product/:productId",
    upload.array("images", 10),
    upsertProductImages
  ); // Upsert

// Batch operations
router
  .delete("/batch/delete", deleteProductImagesBatch) // Delete multiple
  .get("/batch/product", getProductImagesByProductIds); // Get by multiple product IDs

export default router;
