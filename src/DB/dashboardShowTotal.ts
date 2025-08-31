import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getFinancialTotals() {
  try {
    return await prisma.$transaction(async (tx) => {
      const [totalPurchaseDue, totalSalesDue, totalExpense, totalSalesAmount] =
        await Promise.all([
          // 1. Total Purchase Due
          tx.purchase.aggregate({
            _sum: { due: true },
            where: { due: { gt: 0 } },
          }),

          // 2. Total Sales Due
          tx.paymentAndDue.aggregate({
            _sum: { due: true },
            where: { due: { gt: 0 } },
          }),

          // 3. Total Expense
          tx.purchase.aggregate({
            _sum: { expenseAmount: true },
            where: { expenseAmount: { not: null } },
          }),

          // 4. Total Sales Amount
          tx.sales.aggregate({
            _sum: { salesPrice: true },
          }),
        ]);

      return {
        totalPurchaseDue: totalPurchaseDue._sum.due || 0,
        totalSalesDue: totalSalesDue._sum.due || 0,
        totalExpense: totalExpense._sum.expenseAmount || 0,
        totalSalesAmount: totalSalesAmount._sum.salesPrice || 0,
      };
    });
  } catch (error) {
    console.error("Error fetching financial totals:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default getFinancialTotals;
