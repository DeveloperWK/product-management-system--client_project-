import { ISupplier } from '../type';
import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();
const createSupplier = async ({
  name,
  email,
  phone,
}: Omit<ISupplier, "password">): Promise<
  Omit<ISupplier, "password"> | undefined
> => {
  try {
    return await prisma.supplier.create({
      data: {
        name,
        ...(email && { email }),
        phone,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const updateSupplier = async (
  id: string,
  name?: string,
  phone?: string,
  email?: string
) => {
  try {
    return await prisma.supplier.update({
      where: {
        id: id,
      },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
      },
    });
  } catch (err) {
    throw err;
  }
};
const deleteSupplierDb = async (id: string) => {
  try {
    const deletedUser = await prisma.supplier.delete({
      where: {
        id: id,
      },
    });
    return { success: true, supplier: deletedUser };
  } catch (err: any) {
    throw err;
  }
};
type UserIdentifier = { id: string } | { email: string };

const getSupplierByIdDB = async (identifier: UserIdentifier) => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: identifier,
      include: {
        purchases: {
          select: {
            due: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new Error("supplier not found");
    }

    return supplier;
  } catch (err) {
    throw err;
  }
};
const getAllSuppliersDB = async () => {
  try {
    return await prisma.supplier.findMany({
      include: {
        purchases: {
          select: {
            due: true,
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
export {
  createSupplier,
  deleteSupplierDb,
  getAllSuppliersDB,
  getSupplierByIdDB,
  updateSupplier,
};
