import { prisma } from "../config/db.config";

 const warehouseOperations = {

  create: async (name: string) => {
    return await prisma.warehouse.create({
      data:{name}
    });
  },


  getAll: async () => {
    return await prisma.warehouse.findMany({
      include: { products: true }
    });
  },


  getById: async (id: string) => {
    return await prisma.warehouse.findUnique({
      where: { id },
      include: { products: true }
    });
  },


  getByName: async (name: string) => {
    return await prisma.warehouse.findUnique({
      where: { name },
      include: { products: true }
    });
  },


  update: async (id: string,  data:{ name?: string }) => {
    return await prisma.warehouse.update({
      where: { id },
      data
    });
  },


  delete: async (id: string) => {
    return await prisma.warehouse.delete({
      where: { id }
    });
  }
};
 export default warehouseOperations
