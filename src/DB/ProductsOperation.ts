import { getPrismaInstance } from "../config/db.config";

const prisma = getPrismaInstance();

const productOperations = {
  create: async (data: {
    name: string;
    slug?: string;
    sku?: string;
    itemCode?: string;
    quantityAlert?: number;
    manufacturedDate?: Date;
    expiryDate?: Date;
    description?: string;
    storeId: string;
    warehouseId: string;
    categoryId?: string;
    subCategoryId?: string;
    subSubCategoryId?: string;
    brandId?: string;
    attributeValueIds?: string[];
  }) => {
    try {
      const createData: any = {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        itemCode: data.itemCode,
        quantityAlert: data.quantityAlert,
        manufacturedDate: data.manufacturedDate,
        expiryDate: data.expiryDate,
        description: data.description,
        store: { connect: { id: data.storeId } },
        warehouse: { connect: { id: data.warehouseId } },
      };

      if (data.categoryId) {
        createData.category = { connect: { id: data.categoryId } };
      }
      if (data.subCategoryId) {
        createData.subCategory = { connect: { id: data.subCategoryId } };
      }
      if (data.subSubCategoryId) {
        createData.subSubCategory = { connect: { id: data.subSubCategoryId } };
      }
      if (data.brandId) {
        createData.brand = { connect: { id: data.brandId } };
      }
      if (data.attributeValueIds && data.attributeValueIds.length > 0) {
        createData.attributes = {
          connect: data.attributeValueIds.map((id) => ({ id })),
        };
      }

      return await prisma.product.create({
        data: createData,
      });
    } catch (error) {
      throw error;
    }
  },

  getAll: async (includeRelations = true) => {
    try {
      const include: any = includeRelations
        ? {
            store: true,
            warehouse: true,
            category: true,
            subCategory: true,
            subSubCategory: true,
            brand: true,
            attributes: true,
            images: true,
          }
        : {};

      return await prisma.product.findMany({ include });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.product.findUnique({
        where: { id },
        include: {
          store: true,
          warehouse: true,
          category: true,
          subCategory: true,
          subSubCategory: true,
          brand: true,
          attributes: true,
          images: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  getAllActiveProducts: async () => {
    try {
      return await prisma.product.findMany({
        where: { isActive: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getBySku: async (sku: string) => {
    try {
      return await prisma.product.findUnique({
        where: { sku },
        include: {
          store: true,
          warehouse: true,
          category: true,
          subCategory: true,
          subSubCategory: true,
          brand: true,
          attributes: true,
          images: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (
    id: string,
    data: {
      name?: string;
      slug?: string;
      itemCode?: string;
      quantityAlert?: number;
      manufacturedDate?: Date;
      expiryDate?: Date;
      description?: string;
      storeId?: string;
      warehouseId?: string;
      categoryId?: string;
      subCategoryId?: string;
      subSubCategoryId?: string;
      brandId?: string;
      attributeValueIds?: string[];
    }
  ) => {
    try {
      const updateData: any = {};

      if (data.name) updateData.name = data.name;
      if (data.slug !== undefined) updateData.slug = data.slug;
      if (data.itemCode !== undefined) updateData.itemCode = data.itemCode;
      if (data.quantityAlert !== undefined)
        updateData.quantityAlert = data.quantityAlert;
      if (data.manufacturedDate !== undefined)
        updateData.manufacturedDate = data.manufacturedDate;
      if (data.expiryDate !== undefined)
        updateData.expiryDate = data.expiryDate;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.storeId) {
        updateData.store = { connect: { id: data.storeId } };
      }
      if (data.warehouseId) {
        updateData.warehouse = { connect: { id: data.warehouseId } };
      }
      if (data.categoryId !== undefined) {
        updateData.category = data.categoryId
          ? { connect: { id: data.categoryId } }
          : { disconnect: true };
      }
      if (data.subCategoryId !== undefined) {
        updateData.subCategory = data.subCategoryId
          ? { connect: { id: data.subCategoryId } }
          : { disconnect: true };
      }
      if (data.subSubCategoryId !== undefined) {
        updateData.subSubCategory = data.subSubCategoryId
          ? { connect: { id: data.subSubCategoryId } }
          : { disconnect: true };
      }
      if (data.brandId !== undefined) {
        updateData.brand = data.brandId
          ? { connect: { id: data.brandId } }
          : { disconnect: true };
      }
      if (data.attributeValueIds) {
        updateData.attributes = {
          set: data.attributeValueIds.map((id) => ({ id })),
        };
      }

      return await prisma.product.update({
        where: { id },
        data: updateData,
        include: {
          store: true,
          warehouse: true,
          category: true,
          subCategory: true,
          subSubCategory: true,
          brand: true,
          attributes: true,
          images: true,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },

  // searchByName: async (searchTerm: string) => {
  //   try {
  //     const cleanedTerm = searchTerm.trim();
  //
  //     return await prisma.product.findMany({
  //       where: {
  //         OR: [
  //           { name: { contains: cleanedTerm, mode: "insensitive" } },
  //           { sku: { contains: cleanedTerm, mode: "insensitive" } },
  //           { itemCode: { contains: cleanedTerm, mode: "insensitive" } },
  //         ],
  //       },
  //       include: {
  //         store: true,
  //         warehouse: true,
  //         category: true,
  //         subCategory: true,
  //         subSubCategory: true,
  //         brand: true,
  //         attributes: true,
  //         images: true,
  //       },
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
};

const productImageOperations = {
  getByProductId: async (productId: string | number) => {
    try {
      if (productId === 0) {
        return await prisma.productImage.findMany();
      }
      const id = productId.toString();
      return await prisma.productImage.findMany({
        where: { productId: id },
      });
    } catch (error) {
      throw error;
    }
  },

  getByProductIds: async (productIds: string[]) => {
    try {
      return await prisma.productImage.findMany({
        where: {
          productId: { in: productIds },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return await prisma.productImage.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },

  create: async (url: string, productId: string) => {
    try {
      return await prisma.productImage.create({
        data: {
          url,
          product: { connect: { id: productId } },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, url: string) => {
    try {
      return await prisma.productImage.update({
        where: { id },
        data: { url },
      });
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      return await prisma.productImage.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  },

  replaceForProduct: async (productId: string, urls: string[]) => {
    try {
      await prisma.productImage.deleteMany({
        where: { productId },
      });

      return await Promise.all(
        urls.map((url) =>
          prisma.productImage.create({
            data: {
              url,
              product: { connect: { id: productId } },
            },
          })
        )
      );
    } catch (error) {
      throw error;
    }
  },

  addForProduct: async (productId: string, urls: string[]) => {
    try {
      return await Promise.all(
        urls.map((url) =>
          prisma.productImage.create({
            data: {
              url,
              product: { connect: { id: productId } },
            },
          })
        )
      );
    } catch (error) {
      throw error;
    }
  },

  upsertForProduct: async (productId: string, urls: string[]) => {
    try {
      const existingImages = await prisma.productImage.findMany({
        where: { productId },
        orderBy: { id: "asc" },
      });

      if (urls.length < existingImages.length) {
        const imagesToDelete = existingImages.slice(urls.length);
        await prisma.productImage.deleteMany({
          where: {
            id: { in: imagesToDelete.map((img) => img.id) },
          },
        });
      }
      const updatedImages = await Promise.all(
        urls.map(async (url, index) => {
          if (index < existingImages.length) {
            return prisma.productImage.update({
              where: { id: existingImages[index].id },
              data: { url },
            });
          } else {
            return prisma.productImage.create({
              data: {
                url,
                product: { connect: { id: productId } },
              },
            });
          }
        })
      );

      return updatedImages;
    } catch (error) {
      throw error;
    }
  },

  deleteAllForProduct: async (productId: string) => {
    try {
      return await prisma.productImage.deleteMany({
        where: { productId },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteBatch: async (ids: string[]) => {
    try {
      return await prisma.productImage.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export { productImageOperations, productOperations };
