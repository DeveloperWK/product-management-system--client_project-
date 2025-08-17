import { prisma } from "../config/db.config";

 const storeOperations = {

  create: async (name: string) => {
    return await prisma.store.create({
      data: { name }
    });
  },


  getAll: async () => {
    return await prisma.store.findMany({
      include: { products: true }
    });
  },


  getById: async (id: string) => {
    return await prisma.store.findUnique({
      where: { id },
      include: { products: true }
    });
  },


  getByName: async (name: string) => {
    return await prisma.store.findUnique({
      where: { name },
      include: { products: true }
    });
  },


  update: async (id: string,  data:{ name?: string }) => {
    return await prisma.store.update({
      where: { id },
      data
    });
  },


  delete: async (id: string) => {
    return await prisma.store.delete({
      where: { id }
    });
  }
};
 export default storeOperations
