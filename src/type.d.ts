declare global {
  namespace Express {
    interface Request {
      access_token: string;
      token_type: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
      customer: {
        id: string;
        firstName: string;
        email: string;
        phone: string | null;
      };
    }
  }
}

interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
interface RefreshToken {
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
  subCategoryId?: string;
}

interface CreateAttributeRequest {
  name: string;
}

interface UpdateAttributeRequest {
  name?: string;
}

interface CreateAttributeValueRequest {
  values: string[];
  attributeId: string;
}

interface UpdateAttributeValueRequest {
  value?: string;
  attributeId?: string;
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
  storeId: string;
  warehouseId: string;
  categoryId?: string;
  subCategoryId?: string;
  subSubCategoryId?: string;
  brandId?: string;
  attributeValueIds?: string[];
}

interface UpdateProductRequest {
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

interface CreateProductImageRequest {
  url: string;
  productId: string;
}

interface UpdateProductImageRequest {
  url?: string;
}

interface PurchaseType {
  expenseId: string;
  expenseAmount: number;
  storeId: string;
  warehouseId: string;
  productId: string;
  attributeValueId: string;
  status: StatusType;
  amount: number;
  amountKey: string;
  quantity: number;
  payment: number;
  commission: number;
  due: number;
  warrantyId: string;
  supplierId: string;
}
interface ICustomer {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
}
// interface  IcustomerUpdate {
//   firstName: string;
//   lastName: string;
//   password: string;
// }
interface ISupplier extends IUser {
  email?: string | null;
}
type SalesCreateInput = {
  totalPayment?: number;
  salesId?: string;
  customerId?: string;
  purchaseId: string;
  variantValueId: string;
  exchangeCal?: number;
  quantity: number;
  discountType?: "PERCENTAGE" | "CASH";
  discount?: number;
  unitPrice?: number | null;
  salesPrice: number;
  taxType?: "PERCENTAGE" | "CASH";
  tax?: number;
  price: number;
  due?: number;
  couponCode?: string;
  discountAmount?: number;
  finalAmount?: number;
  appliedCoupon?: string | null;
};

type SalesUpdateInput = Partial<
  Omit<SalesCreateInput, "customerId" | "purchaseId" | "variantValueId">
> & {
  id: string;
};
type SalesFilter = {
  customerId?: string;
  purchaseId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
};
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
  ICustomer,
  ISupplier,
  IUser,
  PurchaseType,
  RefreshToken,
  SalesCreateInput,
  SalesFilter,
  SalesUpdateInput,
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
