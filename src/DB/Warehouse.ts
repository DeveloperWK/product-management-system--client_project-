import { prisma } from "../config/db.config";

const warehouseOperations = {
  create: async (name: string) => {
    try {
      return await prisma.warehouse.create({
        data: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.warehouse.findMany({
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.warehouse.findUnique({
        where: { id },
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.warehouse.findUnique({
        where: { name },
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.warehouse.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.warehouse.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default warehouseOperations;
