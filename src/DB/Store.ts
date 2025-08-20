import { prisma } from '../config/db.config';

const storeOperations = {
  create: async (name: string) => {
    try {
      return await prisma.store.create({
        data: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.store.findMany({
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.store.findUnique({
        where: { id },
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.store.findUnique({
        where: { name },
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.store.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.store.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default storeOperations;
