import { Prisma } from "@prisma/client";
import { getPrismaInstance } from "../config/db.config";
import { SalesCreateInput, SalesFilter, SalesUpdateInput } from "../type";

const prisma = getPrismaInstance();

class SalesService {
  // Create a new sale

  async createBulkSales(
    customerId: string,
    totalPayment: number,
    due: number,
    products: SalesCreateInput[]
  ) {
    const createdSales: SalesCreateInput[] = [];

    await prisma.$transaction(async (tx) => {
      for (const sale of products) {
        let discountAmount = 0;
        let appliedCouponId: string | null = null;
        let appliedCouponCode: string | null = null;

        // Coupon validation
        if (sale.couponCode) {
          const coupon = await tx.coupon.findUnique({
            where: { code: sale.couponCode },
            include: { products: true },
          });

          if (!coupon)
            throw new Error(`Invalid coupon code: ${sale.couponCode}`);
          if (!coupon.isActive)
            throw new Error(`Coupon ${sale.couponCode} is not active`);
          if (new Date() > coupon.expiresAt)
            throw new Error(`Coupon ${sale.couponCode} has expired`);
          if (
            coupon.minimumPurchaseAmount &&
            sale.salesPrice < coupon.minimumPurchaseAmount
          )
            throw new Error(
              `Coupon ${sale.couponCode} requires minimum purchase of ${coupon.minimumPurchaseAmount}`
            );

          // Product-specific coupon check
          if (coupon.products.length > 0) {
            const couponProductIds = coupon.products.map((cp) => cp.productId);
            if (!couponProductIds.includes(sale.purchaseId)) {
              throw new Error(
                `Coupon ${sale.couponCode} is not valid for product ${sale.purchaseId}`
              );
            }
          }

          // Calculate discount
          discountAmount =
            coupon.discountType === "PERCENTAGE"
              ? (sale.salesPrice * coupon.discount) / 100
              : coupon.discount;

          appliedCouponId = coupon.id;
          appliedCouponCode = coupon.code;
        }

        const finalAmount = sale.salesPrice - discountAmount;
        const purchase = await tx.purchase.findUnique({
          where: { id: sale.purchaseId },
        });

        if (!purchase)
          throw new Error(`Purchase not found: ${sale.purchaseId}`);
        if (purchase.quantity < sale.quantity) {
          throw new Error(
            `Not enough stock for product ${sale.purchaseId}. Available: ${purchase.quantity}`
          );
        }

        const createdSale = await tx.sales.create({
          data: {
            customerId,
            purchaseId: sale.purchaseId,
            variantValueId: sale.variantValueId,
            quantity: sale.quantity,
            unitPrice: sale.unitPrice,
            price: sale.price,
            salesPrice: sale.salesPrice,
            discountType: sale.discountType,
            discount: sale.discount,
            taxType: sale.taxType,
            tax: sale.tax,
            exchangeCal: sale.exchangeCal,
            couponId: appliedCouponId,
            discountAmount,
            finalAmount,
          },
        });
        await tx.purchase.update({
          where: { id: sale.purchaseId },
          data: {
            quantity: { decrement: sale.quantity },
            amount: { decrement: sale.quantity * (sale.unitPrice ?? 0) },
          },
        });
        await tx.paymentAndDue.create({
          data: {
            customer: { connect: { id: customerId } },
            amount: totalPayment,
            due: due,
          },
        });
        createdSales.push({
          salesId: createdSale.id,
          purchaseId: createdSale.purchaseId,
          variantValueId: createdSale.variantValueId,
          quantity: createdSale.quantity,
          unitPrice: createdSale.unitPrice,
          salesPrice: createdSale.salesPrice,
          discountAmount: createdSale.discountAmount ?? 0,
          finalAmount: createdSale.finalAmount ?? 0,
          appliedCoupon: appliedCouponCode ?? null,
          price: createdSale.price ?? 0,
          totalPayment: totalPayment,
        });
      }
    });

    return createdSales;
  }

  // Get sale by ID with relations
  async getSaleById(id: string) {
    try {
      return await prisma.sales.findUnique({
        where: { id },
        include: {
          customer: true,
          purchase: true,
          variant: {
            include: {
              attribute: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch sale: ${error}`);
    }
  }

  // Get multiple sales with filtering and pagination
  async getSales(
    filter: SalesFilter = {},
    page: number = 1,
    limit: number = 20,
    orderBy: Prisma.SalesOrderByWithRelationInput = { id: "desc" }
  ) {
    try {
      const skip = (page - 1) * limit;

      const where: Prisma.SalesWhereInput = {
        ...(filter.customerId && { customerId: filter.customerId }),
        ...(filter.dateFrom &&
          filter.dateTo && {
            createdAt: {
              gte: filter.dateFrom,
              lte: filter.dateTo,
            },
          }),
        ...(filter.minAmount && {
          salesPrice: {
            gte: filter.minAmount,
          },
        }),
        ...(filter.maxAmount && {
          salesPrice: {
            lte: filter.maxAmount,
          },
        }),
      };

      const [sales, total] = await Promise.all([
        prisma.sales.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            customer: {
              select: {
                id: true,
                firstName: true,
                email: true,
              },
            },
            variant: {
              select: {
                id: true,
                value: true,
              },
            },
          },
        }),
        prisma.sales.count({ where }),
      ]);

      return {
        data: sales,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to fetch sales: ${error}`);
    }
  }

  // Update sale
  async updateSale(data: SalesUpdateInput) {
    try {
      const { id } = data;
      const updateData: any = {
        ...data,
      };

      if (data.discountType) {
        updateData.discountType = data.discountType;
      }
      if (data.taxType) {
        updateData.taxType = data.taxType;
      }
      if (data.exchangeCal) {
        updateData.exchangeCal = data.exchangeCal;
      }
      if (data.quantity) {
        updateData.quantity = data.quantity;
      }

      return await prisma.sales.update({
        where: { id },
        data: updateData,
        include: {
          customer: true,
          purchase: true,
          variant: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Sale not found");
        }
      }
      throw new Error(`Failed to update sale: ${error}`);
    }
  }

  // Delete sale
  async deleteSale(id: string) {
    try {
      return await prisma.sales.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Sale not found");
        }
      }
      throw new Error(`Failed to delete sale: ${error}`);
    }
  }

  // Bulk create sales
  // async createBulkSales(salesData: SalesCreateInput[]) {
  //   try {
  //     return await prisma.sales.createMany({
  //       // @ts-ignore
  //       data: salesData.map((sale) => ({
  //         customer: { connect: { id: sale.customerId } },
  //         product: { connect: { id: sale.purchaseId } },
  //         variantValueId: { connect: { id: sale.variantValueId } },
  //         exchangeCal: sale.exchangeCal,
  //         quantity: sale.quantity,
  //         discountType: sale.discountType,
  //         discount: sale.discount,
  //         unitPrice: sale.unitPrice,
  //         salesPrice: sale.salesPrice,
  //         taxType: sale.taxType,
  //         tax: sale.tax,
  //       })),
  //       skipDuplicates: true,
  //     });
  //   } catch (error) {
  //     throw new Error(`Failed to create bulk sales: ${error}`);
  //   }
  // }

  // Get sales summary statistics
  async getSalesSummary(startDate?: Date, endDate?: Date, customerId?: string) {
    try {
      const where: Prisma.SalesWhereInput = {};

      if (startDate && endDate) {
        where.createdAt = {
          gte: startDate,
          lte: endDate,
        };
      }

      if (customerId) {
        where.customerId = customerId;
      }

      const [summary, topPurchase] = await Promise.all([
        prisma.sales.aggregate({
          where,
          _sum: {
            salesPrice: true,
            quantity: true,
            tax: true,
            discount: true,
          },
          _avg: {
            salesPrice: true,
            quantity: true,
          },
          _count: { _all: true }, // ✅ replaces separate count()
        }),

        prisma.sales.groupBy({
          by: ["purchaseId"],
          where,
          _sum: {
            quantity: true,
            salesPrice: true,
          },
          orderBy: {
            _sum: {
              salesPrice: "desc",
            },
          },
          take: 10,
        }),
      ]);

      return {
        summary: {
          totalSales: summary._sum.salesPrice || 0,
          totalQuantity: summary._sum.quantity || 0,
          totalTax: summary._sum.tax || 0,
          totalDiscount: summary._sum.discount || 0,
          averageSale: summary._avg.salesPrice || 0,
          totalTransactions: summary._count._all || 0, // ✅ already included
        },
        topPurchase,
      };
    } catch (error) {
      throw new Error(`Failed to fetch sales summary: ${error}`);
    }
  }

  // Get sales by customer
  async getSalesByCustomer(customerId: string, limit: number = 10) {
    try {
      return await prisma.sales.findMany({
        where: { customerId: customerId },
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          purchase: true,

          variant: {
            select: {
              value: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch customer sales: ${error}`);
    }
  }

  // Get sales by product
  async getSalesByProduct(purchaseId: string, limit: number = 10) {
    try {
      return await prisma.sales.findMany({
        where: { purchaseId },
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          customer: {
            select: {
              firstName: true,
              email: true,
            },
          },
          variant: {
            select: {
              value: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch product sales: ${error}`);
    }
  }

  // Search sales with text search
  async searchSales(searchTerm: string, page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;

      const [sales, total] = await Promise.all([
        prisma.sales.findMany({
          where: {
            OR: [
              {
                customer: {
                  firstName: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
          skip,
          take: limit,
          include: {
            customer: {
              select: {
                firstName: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.sales.count({
          where: {
            OR: [
              {
                customer: {
                  firstName: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            ],
          },
        }),
      ]);

      return {
        data: sales,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Failed to search sales: ${error}`);
    }
  }
  async getAllDuesByCustomer(customerId: string) {
    try {
      const result = await prisma.paymentAndDue.aggregate({
        where: { customerId: customerId },
        _sum: {
          due: true,
        },
      });
      return result._sum.due ?? 0;
    } catch (error) {
      throw new Error(`Failed to fetch customer sales: ${error}`);
    }
  }

  async getMonthlySales() {
    try {
      const sales = await prisma.sales.groupBy({
        by: ["createdAt"], // your purchase date field
        _sum: {
          salesPrice: true, // your sales amount field
        },
      });

      // Initialize array for 12 months
      const monthlySales = Array(12).fill(0);

      sales.forEach((sale) => {
        const month = sale.createdAt.getMonth();
        monthlySales[month] += sale._sum.salesPrice || 0;
      });

      return {
        name: "Sales",
        data: monthlySales,
      };
    } catch (error) {
      throw new Error(`Failed to fetch monthly sales: ${error}`);
    }
  }
  async dueSalesPaymentsDb(data: { salesId: string; amount: number }) {
    try {
      return await prisma.$transaction(async (t) => {
        await prisma.salesDuePayment.create({
          data: {
            sales: { connect: { id: data.salesId } },
            amount: data.amount,
          },
        });
        await t.purchase.update({
          where: { id: data.salesId },
          data: {
            due: {
              decrement: data.amount,
            },
          },
        });
      });
    } catch (e) {
      throw e;
    }
  }

  createReturnSalesDb = async (data: {
    purchaseId: string;
    salesPrice: number;
    salesId: string;
    amount: number;
    quantity: number;
  }) => {
    try {
      return await prisma.$transaction(async (t) => {
        await t.purchase.update({
          where: { id: data.purchaseId },
          data: {
            quantity: {
              increment: data.quantity,
            },
            amount: {
              increment: data.amount,
            },
          },
        });
        await t.sales.update({
          where: { id: data.salesId },
          data: {
            quantity: {
              decrement: data.quantity,
            },
            salesPrice: {
              increment: data.salesPrice,
            },
          },
        });
      });
    } catch (e) {
      throw e;
    }
  };
}

// Export singleton instance
export const salesService = new SalesService();

// Export types for external use
export type { SalesCreateInput, SalesFilter, SalesUpdateInput };
