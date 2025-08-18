import { prisma } from '../config/db.config';
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
  },

  // Get all products
  getAll: async (includeRelations = true) => {
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
  },

  getById: async (id: string) => {
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
  },

  getBySku: async (sku: string) => {
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
    },
  ) => {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.itemCode !== undefined) updateData.itemCode = data.itemCode;
    if (data.quantityAlert !== undefined)
      updateData.quantityAlert = data.quantityAlert;
    if (data.manufacturedDate !== undefined)
      updateData.manufacturedDate = data.manufacturedDate;
    if (data.expiryDate !== undefined) updateData.expiryDate = data.expiryDate;
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
  },

  // Delete product
  delete: async (id: string) => {
    return await prisma.product.delete({
      where: { id },
    });
  },

  // Search products by name
  searchByName: async (searchTerm: string) => {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
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
  },
};

const productImageOperations = {
  // Get images by product ID (0 = all images)
  getByProductId: async (productId: string | number) => {
    if (productId === 0) {
      // Get all images
      return await prisma.productImage.findMany();
    }
    const id = productId.toString();
    return await prisma.productImage.findMany({
      where: { productId: id },
    });
  },

  // Get images by multiple product IDs
  getByProductIds: async (productIds: string[]) => {
    return await prisma.productImage.findMany({
      where: {
        productId: { in: productIds },
      },
    });
  },

  // Get image by ID
  getById: async (id: string) => {
    return await prisma.productImage.findUnique({
      where: { id },
    });
  },

  // Create a single image
  create: async (url: string, productId: string) => {
    return await prisma.productImage.create({
      data: {
        url,
        product: { connect: { id: productId } },
      },
    });
  },

  // Update a single image
  update: async (id: string, url: string) => {
    return await prisma.productImage.update({
      where: { id },
      data: { url },
    });
  },

  // Delete a single image
  delete: async (id: string) => {
    return await prisma.productImage.delete({
      where: { id },
    });
  },

  // Replace all images for a product
  replaceForProduct: async (productId: string, urls: string[]) => {
    // Delete all existing images for this product
    await prisma.productImage.deleteMany({
      where: { productId },
    });

    // Create new images
    const newImages = await Promise.all(
      urls.map((url) =>
        prisma.productImage.create({
          data: {
            url,
            product: { connect: { id: productId } },
          },
        }),
      ),
    );

    return newImages;
  },

  // Add images to a product (without deleting existing)
  addForProduct: async (productId: string, urls: string[]) => {
    const newImages = await Promise.all(
      urls.map((url) =>
        prisma.productImage.create({
          data: {
            url,
            product: { connect: { id: productId } },
          },
        }),
      ),
    );

    return newImages;
  },

  // Upsert images for a product
  upsertForProduct: async (productId: string, urls: string[]) => {
    // Get existing images
    const existingImages = await prisma.productImage.findMany({
      where: { productId },
      orderBy: { id: 'asc' },
    });

    // Handle deletion of extra images
    if (urls.length < existingImages.length) {
      const imagesToDelete = existingImages.slice(urls.length);
      await prisma.productImage.deleteMany({
        where: {
          id: { in: imagesToDelete.map((img) => img.id) },
        },
      });
    }

    // Update/create images
    const updatedImages = await Promise.all(
      urls.map(async (url, index) => {
        if (index < existingImages.length) {
          // Update existing
          return await prisma.productImage.update({
            where: { id: existingImages[index].id },
            data: { url },
          });
        } else {
          // Create new
          return await prisma.productImage.create({
            data: {
              url,
              product: { connect: { id: productId } },
            },
          });
        }
      }),
    );

    return updatedImages;
  },

  // Delete all images for a product
  deleteAllForProduct: async (productId: string) => {
    return await prisma.productImage.deleteMany({
      where: { productId },
    });
  },

  // Delete multiple images by IDs
  deleteBatch: async (ids: string[]) => {
    return await prisma.productImage.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  },
};
export { productImageOperations, productOperations };
