import { getPrismaInstance } from '../config/db.config';

const prisma = getPrismaInstance();

const brandOperations = {
  create: async (name: string) => {
    try {
      return await prisma.brand.create({
        data: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.brand.findMany({
        include: {      products: {
            select:{
              name:true,
              slug:true,
              sku:true,
              expiryDate:true,
              description:true,
              brand:true,
            }
          }, },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.brand.findUnique({
        where: { id },
        include: {      products: {
            select:{
              name:true,
              slug:true,
              sku:true,
              expiryDate:true,
              description:true,
              brand:true,
            }
          }, },
      });
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.brand.findUnique({
        where: { name },
        include: { products: true },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.brand.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.brand.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default brandOperations;
