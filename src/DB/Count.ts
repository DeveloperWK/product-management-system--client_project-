import { getPrismaInstance } from "../config/db.config";

const prisma = getPrismaInstance();

const getCounts = async () => {
  const [customers, suppliers, sales, purchases] = await prisma.$transaction([
    prisma.customer.count(),
    prisma.supplier.count(),
    prisma.sales.count(),
    prisma.purchase.count(),
  ]);

  return {
    customers,
    suppliers,
    sales,
    purchases,
  };
};

export default getCounts;
