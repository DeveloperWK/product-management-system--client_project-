import { Request, Response } from "express";
import { SalesFilter, salesService } from "../../DB/Sales";
import { getPrismaInstance } from "../../config/db.config";

const prisma = getPrismaInstance();

export const getPrice = async (req: Request, res: Response) => {
  const { weight, calQ, purchaseId } = req.body;
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id: purchaseId,
      },
      select: {
        purchaseTotalAmount: true,
        amount: true,
      },
    });
    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }
    const unitPrice = purchase?.purchaseTotalAmount / weight;
    const price = unitPrice * calQ;
    res.status(200).json({ purchase, price, unitPrice });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Create a new sale

export const createSale = async (req: Request, res: Response) => {
  try {
    const { customerId, products, due, totalPayment } = req.body;

    if (
      !customerId ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer and products are required",
      });
    }

    const sales = await salesService.createBulkSales(
      customerId,
      totalPayment,
      due,
      products
    );

    return res.status(201).json({
      success: true,
      message: "Sales created successfully",
      sales,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create sale",
    });
  }
};

export const getDues = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const dues = await salesService.getAllDuesByCustomer(customerId);
    return res.status(200).json({
      success: true,
      dues,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to getDues",
    });
  }
};
export const getProductName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const sales = await salesService.getByProductName(name);
    return res.status(200).json({
      success: true,
      sales,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get sales",
    });
  }
};
// Get sale by ID
export const getSaleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    return res.json({
      success: true,
      sale,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sale",
    });
  }
};

// Get all sales with filtering and pagination
export const getSales = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "20",
      customerId,
      purchaseId,
      dateFrom,
      dateTo,
      minAmount,
      maxAmount,
      sortBy = "id",
      sortOrder = "desc",
    } = req.query;
    const filter: SalesFilter = {
      ...(customerId && { customerId: customerId as string }),
      ...(purchaseId && { purchaseId: purchaseId as string }),
      ...(dateFrom &&
        dateTo && {
          dateFrom: new Date(`${dateFrom}T00:00:00.000Z`),
          dateTo: new Date(`${dateTo}T00:00:00.000Z`),
        }),
      ...(minAmount && { minAmount: parseFloat(minAmount as string) }),
      ...(maxAmount && { maxAmount: parseFloat(maxAmount as string) }),
    };

    const orderBy = {
      [sortBy as string]: sortOrder,
    };

    const result = await salesService.getSales(
      filter,
      parseInt(page as string),
      parseInt(limit as string),
      orderBy
    );

    return res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sales",
    });
  }
};

// Update sale
export const updateSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, id };

    await salesService.updateSale(updateData);
    return res.json({
      success: true,
      message: "Sale updated successfully",
    });
  } catch (error: any) {
    if (error.message === "Sale not found") {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update sale",
    });
  }
};

// Delete sale
export const deleteSale = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await salesService.deleteSale(id);

    return res.json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error: any) {
    if (error.message === "Sale not found") {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete sale",
    });
  }
};
// Get sales summary
export const getSalesSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, customerId } = req.query;

    const summary = await salesService.getSalesSummary(
      startDate ? new Date(`${startDate}T00:00:00.000Z`) : undefined,
      endDate ? new Date(`${endDate}T00:00:00.000Z`) : undefined,
      customerId as string
    );

    return res.json({
      success: true,
      summary,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sales summary",
    });
  }
};

// Get sales by customer
export const getSalesByCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { limit = "10" } = req.query;

    const sales = await salesService.getSalesByCustomer(
      customerId,
      parseInt(limit as string)
    );

    return res.json({
      success: true,
      sales,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customer sales",
    });
  }
};

// Get sales by product
export const getSalesByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { limit = "10" } = req.query;

    const sales = await salesService.getSalesByProduct(
      productId,
      parseInt(limit as string)
    );

    return res.json({
      success: true,
      sales,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product sales",
    });
  }
};

// Search sales
export const searchSales = async (req: Request, res: Response) => {
  try {
    const { q, page = "1", limit = "20" } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query (q) is required",
      });
    }

    const result = await salesService.searchSales(
      q as string,
      parseInt(page as string),
      parseInt(limit as string)
    );

    return res.json({
      success: true,
      sales: result.data,
      pagination: result.pagination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to search sales",
    });
  }
};
export const getAllSalesByMonth = async (_req: Request, res: Response) => {
  try {
    const sells = await salesService.getMonthlySales();
    return res.status(200).json({
      success: true,
      sales: sells,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to get monthly sales",
    });
  }
};
export const createDuePaymentsSales = async (req: Request, res: Response) => {
  try {
    const { customerId, amount } = req.body;
    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Customer ID is required",
      });
    }
    await salesService.dueSalesPaymentsDb({ customerId, amount });
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

export const createReturnSales = async (req: Request, res: Response) => {
  try {
    const { purchaseId, amount, quantity, salesId, salesPrice } = req.body;

    if (!purchaseId || !amount || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find warranty for this purchase
    const warranty = await prisma.warranty.findFirst({
      where: {
        purchase: {
          some: {
            id: purchaseId,
          },
        },
      },
    });

    if (warranty) {
      const createdAt = new Date(warranty.createdAt);
      const expiryDate = new Date(createdAt);
      expiryDate.setDate(expiryDate.getDate() + warranty.days);

      if (new Date() > expiryDate) {
        return res.status(400).json({
          success: false,
          message: "Warranty expired, cannot return",
        });
      }
    }

    // Create return record
    await salesService.createReturnSalesDb({
      purchaseId,
      salesPrice,
      salesId,
      amount,
      quantity,
    });

    res.status(200).json({
      success: true,
      message: "Return created successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: (e as Error).message,
    });
  }
};
