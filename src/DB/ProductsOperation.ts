import { prisma } from "../config/db.config";
import { attributeOperations, attributeValueOperations } from "./Attribute";
import brandOperations from "./Brand";
import { categoryOperations, subCategoryOperations, subSubCategoryOperations } from "./Categories";
import storeOperations from "./Store";
import warehouseOperations from "./Warehouse";


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
    storeId: number;
    warehouseId: number;
    categoryId?: number;
    subCategoryId?: number;
    subSubCategoryId?: number;
    brandId?: number;
    attributeValueIds?: number[];
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
      warehouse: { connect: { id: data.warehouseId } }
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
        connect: data.attributeValueIds.map(id => ({ id }))
      };
    }

    return await prisma.product.create({
      data: createData,
      include: {
        store: true,
        warehouse: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
        brand: true,
        attributes: true,
        images: true
      }
    });
  },

  // Get all products
  getAll: async (includeRelations = true) => {
    const include: any = includeRelations ? {
      store: true,
      warehouse: true,
      category: true,
      subCategory: true,
      subSubCategory: true,
      brand: true,
      attributes: true,
      images: true
    } : {};

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
        images: true
      }
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
        images: true
      }
    });
  },


  update: async (id: string, data: {
    name?: string;
    slug?: string;
    sku?: string;
    itemCode?: string;
    quantityAlert?: number;
    manufacturedDate?: Date;
    expiryDate?: Date;
    description?: string;
    storeId?: number;
    warehouseId?: number;
    categoryId?: number;
    subCategoryId?: number;
    subSubCategoryId?: number;
    brandId?: number;
    attributeValueIds?: number[];
  }) => {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.itemCode !== undefined) updateData.itemCode = data.itemCode;
    if (data.quantityAlert !== undefined) updateData.quantityAlert = data.quantityAlert;
    if (data.manufacturedDate !== undefined) updateData.manufacturedDate = data.manufacturedDate;
    if (data.expiryDate !== undefined) updateData.expiryDate = data.expiryDate;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.storeId) {
      updateData.store = { connect: { id: data.storeId } };
    }
    if (data.warehouseId) {
      updateData.warehouse = { connect: { id: data.warehouseId } };
    }
    if (data.categoryId !== undefined) {
      updateData.category = data.categoryId ? { connect: { id: data.categoryId } } : { disconnect: true };
    }
    if (data.subCategoryId !== undefined) {
      updateData.subCategory = data.subCategoryId ? { connect: { id: data.subCategoryId } } : { disconnect: true };
    }
    if (data.subSubCategoryId !== undefined) {
      updateData.subSubCategory = data.subSubCategoryId ? { connect: { id: data.subSubCategoryId } } : { disconnect: true };
    }
    if (data.brandId !== undefined) {
      updateData.brand = data.brandId ? { connect: { id: data.brandId } } : { disconnect: true };
    }
    if (data.attributeValueIds) {
      updateData.attributes = {
        set: data.attributeValueIds.map(id => ({ id }))
      };
    }

    return await prisma.product.update({
      where: { id },
       data:updateData,
      include: {
        store: true,
        warehouse: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
        brand: true,
        attributes: true,
        images: true
      }
    });
  },

  // Delete product
  delete: async (id: string) => {
    return await prisma.product.delete({
      where: { id }
    });
  },

  // Search products by name
  searchByName: async (searchTerm: string) => {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      },
      include: {
        store: true,
        warehouse: true,
        category: true,
        subCategory: true,
        subSubCategory: true,
        brand: true,
        attributes: true,
        images: true
      }
    });
  }
};


 const productImageOperations = {

  create: async (url: string, productId: string) => {
    return await prisma.productImage.create({
      data: {
        url,
        product: { connect: { id: productId } }
      }
    });
  },


  getByProductId: async (productId: string) => {
    return await prisma.productImage.findMany({
      where: { productId }
    });
  },


  getById: async (id: string) => {
    return await prisma.productImage.findUnique({
      where: { id }
    });
  },


  update: async (id: string, url: string) => {
    return await prisma.productImage.update({
      where: { id },
       data:{ url }
    });
  },


  delete: async (id: string) => {
    return await prisma.productImage.delete({
      where: { id }
    });
  }
};


export const dbOperations = {
  stores: storeOperations,
  warehouses: warehouseOperations,
  brands: brandOperations,
  categories: categoryOperations,
  subCategories: subCategoryOperations,
  subSubCategories: subSubCategoryOperations,
  attributes: attributeOperations,
  attributeValues: attributeValueOperations,
  products: productOperations,
  productImages: productImageOperations
};

export default dbOperations;
