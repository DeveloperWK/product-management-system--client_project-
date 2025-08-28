import { prisma } from "../config/db.config";

const ExpenseOperations = {
  create: async (name: string) => {
    try {
      return await prisma.expense.create({
        data: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.expense.findMany();
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.expense.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.expense.findUnique({
        where: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.expense.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.expense.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default ExpenseOperations;
