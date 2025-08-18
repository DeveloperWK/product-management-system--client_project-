import { prisma } from '../config/db.config';

const categoryOperations = {
  create: async (name: string) => {
    return await prisma.category.create({
      data: { name },
    });
  },

  getAll: async () => {
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
  },

  getById: async (id: string) => {
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
  },

  getByName: async (name: string) => {
    return await prisma.category.findUnique({
      where: { name },
      include: {
        subCategories: true,
        product: true,
      },
    });
  },

  update: async (id: string, data: { name?: string }) => {
    return await prisma.category.update({
      where: { id },
      data,
    });
  },

  delete: async (id: string) => {
    return await prisma.category.delete({
      where: { id },
    });
  },
};
const subCategoryOperations = {
  create: async (name: string, categoryId: string) => {
    return await prisma.subCategory.create({
      data: {
        name,
        category: { connect: { id: categoryId } },
      },
    });
  },

  getAll: async () => {
    return await prisma.subCategory.findMany({
      include: {
        category: true,
        subSubCategories: true,
        product: true,
      },
    });
  },

  getById: async (id: string) => {
    return await prisma.subCategory.findUnique({
      where: { id },
      include: {
        category: true,
        subSubCategories: true,
        product: true,
      },
    });
  },

  update: async (id: string, data: { name?: string; categoryId?: string }) => {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.categoryId) {
      updateData.category = { connect: { id: data.categoryId } };
    }

    return await prisma.subCategory.update({
      where: { id },
      data: updateData,
    });
  },

  delete: async (id: string) => {
    return await prisma.subCategory.delete({
      where: { id },
    });
  },
};

const subSubCategoryOperations = {
  create: async (name: string, subCategoryId: string) => {
    return await prisma.subSubCategory.create({
      data: {
        name,
        subCategory: { connect: { id: subCategoryId } },
      },
    });
  },

  getAll: async () => {
    return await prisma.subSubCategory.findMany({
      include: {
        subCategory: true,
        product: true,
      },
    });
  },

  getById: async (id: string) => {
    return await prisma.subSubCategory.findUnique({
      where: { id },
      include: {
        subCategory: true,
        product: true,
      },
    });
  },

  update: async (
    id: string,
    data: { name?: string; subCategoryId?: string },
  ) => {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.subCategoryId) {
      updateData.subCategory = { connect: { id: data.subCategoryId } };
    }

    return await prisma.subSubCategory.update({
      where: { id },
      data: updateData,
    });
  },

  delete: async (id: string) => {
    return await prisma.subSubCategory.delete({
      where: { id },
    });
  },
};
export { categoryOperations, subCategoryOperations, subSubCategoryOperations };
