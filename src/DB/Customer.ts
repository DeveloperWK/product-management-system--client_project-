import { prisma } from "../config/db.config";
import { ICustomer } from "../type";

const customer = {
  create: async ({ data }: { data: ICustomer }) => {
    try {
      const createData = {
        ...data,
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.phone && { phone: data.phone }),
        ...(data.address && { address: data.address }),
        ...(data.city && { city: data.city }),
        ...(data.zip && { zip: data.zip }),
        ...(data.country && { country: data.country }),
      };
      return await prisma.customer.create({
        data: createData,
      });
    } catch (error) {
      throw error;
    }
  },
  getById: async (id: string) => {
    try {
      return await prisma.customer.findUnique({
        where: { id: id },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
          city: true,
          zip: true,
          country: true,
          sales: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      return await prisma.customer.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          address: true,
          city: true,
          zip: true,
          country: true,
          sales: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (id: string, { data }: { data: ICustomer }) => {
    try {
      return await prisma.customer.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      throw e;
    }
  },
  delete: async (id: string) => {
    try {
      return await prisma.customer.delete({ where: { id: id } });
    } catch (e) {
      throw e;
    }
  },
};
export default customer;
