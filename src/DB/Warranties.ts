import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();

const warrantiesOperations = {
  create: async (data: { name: string; days: number }) => {
    try {
      return await prisma.warranty.create({
        data: {
          name: data.name,
          days: data.days,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.warranty.findMany({
        include: { purchase: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.warranty.findUnique({
        where: { id },
        include: { purchase: true },
      });
    } catch (error) {
      throw error;
    }
  },
  update: async (id: string, data: { name?: string; days?: string }) => {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.days) updateData.days = data.days;
    try {
      return await prisma.warranty.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.warranty.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default warrantiesOperations;
