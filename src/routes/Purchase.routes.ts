import { Router } from "express";
import {
  createDuePaymentsPurchase,
  createPurchase,
  createReturnPurchase,
  deletePurchase,
  getAllPurchaseWithFilters,
  getPurchaseById,
  getPurchaseByProductId,
  getPurchaseByStatus,
  getPurchaseByStoreId,
  getPurchaseByWarehouseId,
  getPurchaseStats,
  getSupplierDues,
  searchPurchase,
  transferStock,
  updatePurchase,
  updatePurchaseStatus,
} from "../controllers/Purchase/Purchase.controller";

const router = Router();

router
  .post("", createPurchase)
  .post("/transfer-stock", transferStock)
  .post("/due/create-payment", createDuePaymentsPurchase)
  .post("/return-purchase", createReturnPurchase)
  .get("", getAllPurchaseWithFilters)
  .get("/search", searchPurchase)
  .get("/dues/:supplierId", getSupplierDues)
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
