import { getPrismaInstance } from "../config/db.config";

const prisma = getPrismaInstance();

const categoryOperations = {
  create: async (name: string) => {
    try {
      return await prisma.category.create({
        data: { name },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.category.findMany({
        include: {
          subCategories: {
            include: {
              subSubCategories: true,
            },
          },
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.category.findUnique({
        where: { id },
        include: {
          subCategories: {
            include: {
              subSubCategories: true,
            },
          },
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getByName: async (name: string) => {
    try {
      return await prisma.category.findUnique({
        where: { name },
        include: {
          subCategories: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string }) => {
    try {
      return await prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

const subCategoryOperations = {
  create: async (name: string, categoryId: string) => {
    try {
      return await prisma.subCategory.create({
        data: {
          name,
          category: { connect: { id: categoryId } },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.subCategory.findMany({
        include: {
          category: true,
          subSubCategories: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.subCategory.findUnique({
        where: { id },
        include: {
          category: true,
          subSubCategories: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, data: { name?: string; categoryId?: string }) => {
    try {
      const updateData: any = {};
      if (data.name) updateData.name = data.name;
      if (data.categoryId) {
        updateData.category = { connect: { id: data.categoryId } };
      }

      return await prisma.subCategory.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.subCategory.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

const subSubCategoryOperations = {
  create: async (name: string, subCategoryId: string) => {
    try {
      return await prisma.subSubCategory.create({
        data: {
          name,
          subCategory: { connect: { id: subCategoryId } },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await prisma.subSubCategory.findMany({
        include: {
          subCategory: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.subSubCategory.findUnique({
        where: { id },
        include: {
          subCategory: true,
          product: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (
    id: string,
    data: { name?: string; subCategoryId?: string }
  ) => {
    try {
      const updateData: any = {};
      if (data.name) updateData.name = data.name;
      if (data.subCategoryId) {
        updateData.subCategory = { connect: { id: data.subCategoryId } };
      }

      return await prisma.subSubCategory.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.subSubCategory.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },
};

export { categoryOperations, subCategoryOperations, subSubCategoryOperations };
