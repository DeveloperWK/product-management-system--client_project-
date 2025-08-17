import { prisma } from "../config/db.config";

 const brandOperations = {

  create: async (name: string) => {
    return await prisma.brand.create({
      data: { name }
    });
  },


  getAll: async () => {
    return await prisma.brand.findMany({
      include: { products: true }
    });
  },


  getById: async (id: string) => {
    return await prisma.brand.findUnique({
      where: { id },
      include: { products: true }
    });
  },


  getByName: async (name: string) => {
    return await prisma.brand.findUnique({
      where: { name },
      include: { products: true }
    });
  },


  update: async (id: string,  data:{ name?: string }) => {
    return await prisma.brand.update({
      where: { id },
      data
    });
  },

  delete: async (id: string) => {
    return await prisma.brand.delete({
      where: { id }
    });
  }
};
export default brandOperations
