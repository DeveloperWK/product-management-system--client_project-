interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
interface refreshToken {
  user_id?: string;
  token: string;
  expires_at: Date;
}

interface CreateStoreRequest {
  name: string;
}

interface UpdateStoreRequest {
  name?: string;
}

interface CreateWarehouseRequest {
  name: string;
}

interface UpdateWarehouseRequest {
  name?: string;
}

interface CreateBrandRequest {
  name: string;
}

interface UpdateBrandRequest {
  name?: string;
}

interface CreateCategoryRequest {
  name: string;
}

interface UpdateCategoryRequest {
  name?: string;
}

export interface CreateSubCategoryRequest {
  name: string;
  categoryId: string;
}

interface UpdateSubCategoryRequest {
  name?: string;
  categoryId?: string;
}

interface CreateSubSubCategoryRequest {
  name: string;
  subCategoryId: string;
}

interface UpdateSubSubCategoryRequest {
  name?: string;
  subCategoryId?: number;
}

interface CreateAttributeRequest {
  name: string;
}

interface UpdateAttributeRequest {
  name?: string;
}

interface CreateAttributeValueRequest {
  value: string;
  attributeId: string;
}

interface UpdateAttributeValueRequest {
  value?: string;
  attributeId?: number;
}

interface CreateProductRequest {
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
}

interface UpdateProductRequest {
  name?: string;
  slug?: string;
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
}

interface CreateProductImageRequest {
  url: string;
  productId: string;
}

interface UpdateProductImageRequest {
  url?: string;
}
export {
  CreateAttributeRequest,
  CreateAttributeValueRequest,
  CreateBrandRequest,
  CreateCategoryRequest,
  CreateProductImageRequest,
  CreateProductRequest,
  CreateStoreRequest,
  CreateSubSubCategoryRequest,
  CreateWarehouseRequest,
  IUser,
  refreshToken,
  UpdateAttributeRequest,
  UpdateAttributeValueRequest,
  UpdateBrandRequest,
  UpdateCategoryRequest,
  UpdateProductImageRequest,
  UpdateProductRequest,
  UpdateStoreRequest,
  UpdateSubCategoryRequest,
  UpdateSubSubCategoryRequest,
  UpdateWarehouseRequest,
};
