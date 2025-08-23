import { Router } from "express";
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
} from "../controllers/Purchase/Purchase.controller";

const router = Router();

router
  .post("", createPurchase)
  .get("", getAllPurchaseWithFilters)
  .get("/search", searchPurchase)
  .get("/stats/summary", getPurchaseStats)
  .get("/:id", getPurchaseById)
  .get("/store/:storeId", getPurchaseByStoreId)
  .get("/warehouse/:warehouseId", getPurchaseByWarehouseId)
  .get("/product/:productId", getPurchaseByProductId)
  .get("/status/:status", getPurchaseByStatus)
  .patch("/:id", updatePurchase)
  .patch("/:id/status", updatePurchaseStatus)
  .delete("/:id", deletePurchase);

export default router;
