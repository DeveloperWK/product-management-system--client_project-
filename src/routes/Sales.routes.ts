import { Router } from "express";
import * as salesController from "../controllers/Sales/Sales.controller";
import { createReturnSales } from "../controllers/Sales/Sales.controller";

const router = Router();

// Sales management routes
router.post("/", salesController.createSale);
router.post("/due/create-payment", salesController.createDuePaymentsSales);
router.post("/return-sales", createReturnSales);
router.get("", salesController.getSales);
router.get("/monthly-sales", salesController.getAllSalesByMonth);
router.get("/:id", salesController.getSaleById);
router.get("/dues/:customerId", salesController.getDues);
router.get("/product/name/:name", salesController.getProductName);
router.post("/get-price", salesController.getPrice);
router.patch("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);

// Analytics and reports
router.get("/summary", salesController.getSalesSummary);
router.get("/customer/:customerId", salesController.getSalesByCustomer);
router.get("/product/:productId", salesController.getSalesByProduct);
router.get("/search", salesController.searchSales);

export default router;
