import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();

async function getStatementReport(startDate?: string, endDate?: string) {
  const dateFilter = (startDate || endDate)
    ? {
      createdAt: {
        gte: startDate ? new Date(`${startDate}T00:00:00.000Z`) : undefined,
        lte: endDate ? new Date(`${endDate}T23:59:59.999Z`) : undefined,
      },
    }
    : {};

  // 1️⃣ Overall Totals
  const [sales, purchases] = await prisma.$transaction([
    prisma.sales.aggregate({
      _sum: {
        salesPrice: true,
        finalAmount: true,
        discountAmount: true,
        tax: true,
      },
      where: dateFilter,
    }),
    prisma.purchase.aggregate({
      _sum: {
        amount: true,        // main purchase cost
        expenseAmount: true, // linked expense total
      },
      where: dateFilter,
    }),

  ]);

  const overallReport = {
    totalGrossSales: sales._sum.salesPrice || 0,
    totalNetSales: sales._sum.finalAmount || 0,
    totalDiscount: sales._sum.discountAmount || 0,
    totalTax: sales._sum.tax || 0,
    totalPurchases: purchases._sum.amount || 0,
    totalExpenseAmount: purchases._sum.expenseAmount || 0,
    profit:
      (sales._sum.finalAmount || 0) -
      (purchases._sum.amount || 0) -
      (purchases._sum.expenseAmount || 0),

  };

  // 2️⃣ Date-wise Breakdown
  const dailySales = await prisma.sales.groupBy({
    by: ["createdAt"],
    _sum: { salesPrice: true, finalAmount: true, discountAmount: true, tax: true },
    where: dateFilter,
  });

  const dailyPurchases = await prisma.purchase.groupBy({
    by: ["createdAt"],
    _sum: { amount: true, expenseAmount: true },
    where: dateFilter,
  });

  const dateMap: Record<
    string,
    {
      grossSales: number;
      netSales: number;
      discount: number;
      tax: number;
      purchases: number;
      expenseAmount: number;
      profit: number;
    }
  > = {};

  for (const s of dailySales) {
    const date = s.createdAt.toISOString().split("T")[0];
    if (!dateMap[date])
      dateMap[date] = { grossSales: 0, netSales: 0, discount: 0, tax: 0, purchases: 0, expenseAmount: 0, profit: 0 };
    dateMap[date].grossSales = s._sum.salesPrice || 0;
    dateMap[date].netSales = s._sum.finalAmount || 0;
    dateMap[date].discount = s._sum.discountAmount || 0;
    dateMap[date].tax = s._sum.tax || 0;
  }

  for (const p of dailyPurchases) {
    const date = p.createdAt.toISOString().split("T")[0];
    if (!dateMap[date])
      dateMap[date] = { grossSales: 0, netSales: 0, discount: 0, tax: 0, purchases: 0, expenseAmount: 0, profit: 0 };
    dateMap[date].purchases = p._sum.amount || 0;
    dateMap[date].expenseAmount = p._sum.expenseAmount || 0;
  }

  // Calculate profit
  for (const d in dateMap) {
    dateMap[d].profit =
      dateMap[d].netSales - dateMap[d].purchases - dateMap[d].expenseAmount;
  }

  const dateWiseReport = Object.entries(dateMap).map(([date, values]) => ({
    date,
    ...values,
  }));

  return { overallReport, dateWiseReport };
}
export default  getStatementReport