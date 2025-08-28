import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  createPurchaseDb,
  createReturnPurchaseDb,
  deletePurchaseDb,
  duePurchasePaymentsDb,
  getAllPurchases,
  getAllPurchasesDb,
  getPurchaseByIdDb,
  getPurchasesByProduct,
  getPurchasesByStatusDb,
  getPurchasesByStore,
  getPurchasesByWarehouse,
  getPurchaseStatsDb,
  searchPurchasesDb,
  updatePurchaseDb,
  updatePurchaseStatusDb,
} from "../../DB/Purchase";
import transferStockDb from "../../DB/transferStock";

const createPurchase = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const purchase = await createPurchaseDb(data);
    res.status(201).json({
      success: true,
      data: purchase,
      message: "Purchase created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const transferStock = async (req: Request, res: Response) => {
  try {
    const {
      fromWarehouseId,
      toWarehouseId,
      productId,
      transferQty,
      attributeValueId,
    } = req.body;
    const stockTransfer = await transferStockDb({
      fromWarehouseId,
      toWarehouseId,
      productId,
      transferQty,
      attributeValueId,
    });
    res.status(200).json({
      success: true,
      data: stockTransfer,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = await getPurchaseByIdDb(id);

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase not found",
      });
    }

    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getAllPurchaseWithFilters = async (req: Request, res: Response) => {
  try {
    const {
      skip,
      take,
      orderBy,
      storeId,
      warehouseId,
      productId,
      status,
      minAmount,
      maxAmount,
      startDate,
      endDate,
    } = req.query;

    // Build where clause for filters
    const where: Prisma.PurchaseWhereInput = {};

    if (storeId) where.storeId = storeId as string;
    if (warehouseId) where.warehouseId = warehouseId as string;
    if (productId) where.productId = productId as string;
    if (status) where.status = status as any;

    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount.gte = Number(minAmount);
      if (maxAmount) where.amount.lte = Number(maxAmount);
    }

    if (startDate || endDate) {
      where.createdAt = {};

      if (startDate) where.createdAt.gte = new Date(startDate as string);

      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const purchases = await getAllPurchases({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy as string) : undefined,
      where,
    });

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getAllPurchase = async (req: Request, res: Response) => {
  try {
    const purchase = await getAllPurchasesDb();

    res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const updatePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const purchase = await updatePurchaseDb(id, data);

    res.status(200).json({
      success: true,
      data: purchase,
      message: "Purchase updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const deletePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = await deletePurchaseDb(id);

    res.status(200).json({
      success: true,
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getPurchaseByStoreId = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const purchases = await getPurchasesByStore(storeId);

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getPurchaseByWarehouseId = async (req: Request, res: Response) => {
  try {
    const { warehouseId } = req.params;
    const purchases = await getPurchasesByWarehouse(warehouseId);

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getPurchaseByProductId = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const purchases = await getPurchasesByProduct(productId);

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getPurchaseByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const purchases = await getPurchasesByStatusDb(status as any);

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const updatePurchaseStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const purchase = await updatePurchaseStatusDb(id, { set: status });

    res.status(200).json({
      success: true,
      data: purchase,
      message: "Purchase status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const getPurchaseStats = async (req: Request, res: Response) => {
  try {
    const stats = await getPurchaseStatsDb();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
const searchPurchase = async (req: Request, res: Response) => {
  try {
    const {
      storeId,
      warehouseId,
      productId,
      status,
      minAmount,
      maxAmount,
      startDate,
      endDate,
    } = req.query;

    const filters: any = {};

    if (storeId) filters.storeId = storeId as string;
    if (warehouseId) filters.warehouseId = warehouseId as string;
    if (productId) filters.productId = productId as string;
    if (status) filters.status = status as any;
    if (minAmount) filters.minAmount = Number(minAmount);
    if (maxAmount) filters.maxAmount = Number(maxAmount);
    if (startDate) filters.startDate = new Date(startDate as string);
    if (endDate) filters.endDate = new Date(endDate as string);

    const purchases = await searchPurchasesDb(filters);

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};

const createDuePaymentsPurchase = async (req: Request, res: Response) => {
  try {
    const { purchaseId, amount } = req.body;
    if (!purchaseId) {
      return res.status(400).json({
        success: false,
        message: "Purchase ID is required",
      });
    }
    await duePurchasePaymentsDb({ purchaseId, amount });
    res.status(200).json({
      success: true,
      message: "Due Payments Created",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: (e as Error).message,
    });
  }
};

const createReturnPurchase = async (req: Request, res: Response) => {
  try {
    const { purchaseId, amount, quantity } = req.body;
    if (!purchaseId || !amount || !quantity) {
      return res.status(400).json({
        message: "All field is required",
      });
    }
    await createReturnPurchaseDb({ purchaseId, amount, quantity });
    res.status(200).json({
      success: true,
      message: "Returned Return",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: (e as Error).message,
    });
  }
};

export {
  createDuePaymentsPurchase,
  createPurchase,
  createReturnPurchase,
  deletePurchase,
  getAllPurchase,
  getAllPurchaseWithFilters,
  getPurchaseById,
  getPurchaseByProductId,
  getPurchaseByStatus,
  getPurchaseByStoreId,
  getPurchaseByWarehouseId,
  getPurchaseStats,
  searchPurchase,
  transferStock,
  updatePurchase,
  updatePurchaseStatus,
};
