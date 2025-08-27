import { Prisma } from '@prisma/client';
import { prisma } from '../config/db.config';
import { PurchaseType } from '../type';

// Create a new purchase
export async function createPurchaseDb(data: PurchaseType) {
  try {
    const createData: any = {
      status: data.status,
      amount: data.amount,
      amountKey: data.amountKey,
      quantity: data.quantity,
      payment: data.payment,
      commission: data.commission,
      due:data.due,
      warranty:{connect:{id:data.warrantyId}},
      supplierId:{connect:{id:data.supplierId}},
      attribute:{connect:{id:data.attributeValueId}},
      store: { connect: { id: data.storeId } },
      warehouse: { connect: { id: data.warehouseId } },
      product: { connect: { id: data.productId } },

    };

    return await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: createData,
        include: {
          store: true,
          warehouse: true,
          product: true,
          attribute: true,
        }
      })
      await tx.product.update({
        where: { id: data.productId },
        data: {
          isActive: true,
        }
      })
      return purchase
    });
  } catch (error) {
    throw new Error(`Error creating purchase: ${(error as Error).message}`);
  }
}

// Get purchase by ID
export async function getPurchaseByIdDb(id: string) {
  try {
    return await prisma.purchase.findUnique({
      where: { id },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(`Error fetching purchase: ${(error as Error).message}`);
  }
}

// Get all purchases with optional filters
export async function getAllPurchases(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.PurchaseWhereUniqueInput;
  where?: Prisma.PurchaseWhereInput;
  orderBy?: Prisma.PurchaseOrderByWithRelationInput;
}) {
  const { skip, take, cursor, where, orderBy } = params;
  try {
    return await prisma.purchase.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(`Error fetching purchases: ${(error as Error).message}`);
  }
}

// Update purchase by ID
export async function updatePurchaseDb(id: string, data: PurchaseType) {
  try {
    const updateData: any = {};

    // only add fields if they're not undefined
    if (data.status !== undefined) updateData.status = data.status;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.amountKey !== undefined) updateData.amountKey = data.amountKey;
    if (data.quantity !== undefined) updateData.quantity = data.quantity;
    if (data.payment !== undefined) updateData.payment = data.payment;
    if (data.commission !== undefined) updateData.commission = data.commission;
    if (data.due !== undefined) updateData.due = data.due;

    // relations
    if (data.storeId !== undefined) {
      updateData.store = { connect: { id: data.storeId } };
    }
    if (data.warehouseId !== undefined) {
      updateData.warehouse = { connect: { id: data.warehouseId } };
    }
    if (data.productId !== undefined) {
      updateData.product = { connect: { id: data.productId } };
    }
if (data.attributeValueId !== undefined) {
      updateData.attribute = { connect: { id: data.attributeValueId } };
    }

    return await prisma.purchase.update({
      where: { id },
      data: updateData,
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(`Error updating purchase: ${(error as Error).message}`);
  }
}

// Delete purchase by ID
export async function deletePurchaseDb(id: string) {
  try {
    const purchase = await prisma.purchase.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    throw new Error(`Error deleting purchase: ${(error as Error).message}`);
  }
}

// Get purchases by store ID
export async function getPurchasesByStore(storeId: string) {
  try {
    return await prisma.purchase.findMany({
      where: { storeId },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(
      `Error fetching purchases by store: ${(error as Error).message}`,
    );
  }
}

// Get purchases by warehouse ID
export async function getPurchasesByWarehouse(warehouseId: string) {
  try {
    return await prisma.purchase.findMany({
      where: { warehouseId },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(
      `Error fetching purchases by warehouse: ${(error as Error).message}`,
    );
  }
}

// Get purchases by product ID
export async function getPurchasesByProduct(productId: string) {
  try {
    return await prisma.purchase.findMany({
      where: { productId },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(
      `Error fetching purchases by product: ${(error as Error).message}`,
    );
  }
}

// Get purchases by status
export async function getPurchasesByStatusDb(
  status: Prisma.EnumStatusTypeFilter,
) {
  try {
    return await prisma.purchase.findMany({
      where: { status },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(
      `Error fetching purchases by status: ${(error as Error).message}`,
    );
  }
}

// Update purchase status
export async function updatePurchaseStatusDb(
  id: string,
  status: Prisma.EnumStatusTypeFieldUpdateOperationsInput,
) {
  try {
    return await prisma.purchase.update({
      where: { id },
      data: { status },
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
    });
  } catch (error) {
    throw new Error(
      `Error updating purchase status: ${(error as Error).message}`,
    );
  }
}

// Get purchase statistics
export async function getPurchaseStatsDb() {
  try {
    const [
      totalPurchases,
      pendingPurchases,
      completedPurchases,
      amountStats,
      quantityStats,
    ] = await Promise.all([
      prisma.purchase.count(),
      prisma.purchase.count({ where: { status: 'PENDING' } }),
      prisma.purchase.count({ where: { status: 'DELIVERED' } }),
      prisma.purchase.aggregate({
        _sum: { amount: true },
      }),
      prisma.purchase.aggregate({
        _sum: { quantity: true },
      }),
    ]);

    return {
      totalPurchases,
      pendingPurchases,
      completedPurchases,
      totalAmount: amountStats._sum.amount || 0,
      totalQuantity: quantityStats._sum.quantity || 0,
    };
  } catch (error) {
    throw new Error(
      `Error fetching purchase stats: ${(error as Error).message}`,
    );
  }
}

// Search purchases with complex filters
export async function searchPurchasesDb(filters: {
  storeId?: string;
  warehouseId?: string;
  productId?: string;
  status?: Prisma.EnumStatusTypeFilter;
  minAmount?: number;
  maxAmount?: number;

  startDate?: Date;
  endDate?: Date;
}) {
  try {
    const where: Prisma.PurchaseWhereInput = {};

    if (filters.storeId) where.storeId = filters.storeId;
    if (filters.warehouseId) where.warehouseId = filters.warehouseId;
    if (filters.productId) where.productId = filters.productId;
    if (filters.status) where.status = filters.status;

    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
      where.amount = {};
      if (filters.minAmount !== undefined) where.amount.gte = filters.minAmount;
      if (filters.maxAmount !== undefined) where.amount.lte = filters.maxAmount;
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    return await prisma.purchase.findMany({
      where,
      include: {
        store: true,
        warehouse: true,
        product: true,
        attribute: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    throw new Error(`Error searching purchases: ${(error as Error).message}`);
  }
}
export const getAllPurchasesDb = async () => {
  try {
    return await prisma.purchase.findMany({
      include: {
        store: true,
        warehouse: true,
        attribute: true,
        product: true,
      },
    });
  } catch (err) {
    throw new Error(`Error searching purchases: ${(err as Error).message}`);
  }
};
