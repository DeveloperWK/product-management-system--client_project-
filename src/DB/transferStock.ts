import { prisma } from "../config/db.config";

const transferStockDb = async ({
  fromWarehouseId,
  toWarehouseId,
  productId,
  transferQty,
  attributeValueId,
}: {
  fromWarehouseId: string;
  toWarehouseId: string;
  productId: string;
  transferQty: number;
  attributeValueId: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const sourcePurchase = await tx.purchase.findFirst({
        where: {
          warehouseId: fromWarehouseId,
          attributeValueId,
          productId,
        },
      });
      if (!sourcePurchase || sourcePurchase.quantity < transferQty) {
        throw new Error("Not enough stock in source warehouse");
      }
      await tx.purchase.update({
        where: { id: sourcePurchase.id },
        data: {
          quantity: { decrement: transferQty },
        },
      });
      const targetPurchase = await tx.purchase.findFirst({
        where: {
          warehouseId: toWarehouseId,
          productId,
          attributeValueId,
        },
      });
      if (targetPurchase) {
        await tx.purchase.update({
          where: { id: targetPurchase.id },
          data: {
            quantity: { increment: transferQty },
          },
        });
      } else {
        throw new Error("Target Purchase not Found");
      }
      return { success: true, message: "Stock transferred successfully" };
    });
  } catch (e) {
    throw e;
  }
};
export default transferStockDb;
