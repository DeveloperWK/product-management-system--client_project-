// routes/salesRoutes.ts
import { Router } from 'express';
import * as salesController from '../controllers/Sales/Sales.controller';


const router = Router();

// Sales management routes
router.post('/', salesController.createSale);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.get('/dues/:customerId', salesController.getDues);
router.get("/get-price",salesController.getPrice)
router.patch('/:id', salesController.updateSale);
router.delete('/:id', salesController.deleteSale);

// Bulk operations
router.post('/bulk', salesController.createBulkSales);

// Analytics and reports
router.get('/summary', salesController.getSalesSummary);
router.get('/customer/:customerId', salesController.getSalesByCustomer);
router.get('/product/:productId', salesController.getSalesByProduct);
router.get('/search', salesController.searchSales);

export default router;