import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import attributesRoute from "./routes/Attribute.routes";
import authRoutes from "./routes/Auth.routes";
import brandsRoutes from "./routes/Brand.routes";
import categoriesRoute from "./routes/Categories.routes";
import couponRoutes from "./routes/Coupon.routes";
import customerRoutes from "./routes/Customer.routes";
import expensesRoutes from "./routes/Expenses.routes";
import productImagesRoute from "./routes/Image.routes";
import productsRoute from "./routes/Products.routes";
import purchasesRoute from "./routes/Purchase.routes";
import storesRoutes from "./routes/Store.routes";
import suppliersRoutes from "./routes/Suppliers.routes";
import userRoutes from "./routes/Users.routes";
import warehouseRoutes from "./routes/Warehouse.routes";
import warrantyRoutes from "./routes/Warranty.routes";

configDotenv();

const app = express();

app
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))

  .use("/api/v1/users", userRoutes)
  .use("/api/v1/auth", authRoutes)
  .use("/api/v1/stores", storesRoutes)
  .use("/api/v1/warehouses", warehouseRoutes)
  .use("/api/v1/categories", categoriesRoute)
  .use("/api/v1/attributes", attributesRoute)
  .use("/api/v1/brands", brandsRoutes)
  .use("/api/v1/products", productsRoute)
  .use("/api/v1/product-images", productImagesRoute)
  .use("/api/v1/purchases", purchasesRoute)
  .use("/api/v1/expenses", expensesRoutes)
  .use("/api/v1/customers", customerRoutes)
  .use("/api/v1/coupons", couponRoutes)
  .use("/api/v1/suppliers", suppliersRoutes)
  .use("/api/v1/warranties", warrantyRoutes);

export default app;
