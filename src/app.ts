import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import attributesRoute from './routes/Attribute.routes';
import authRoutes from './routes/Auth.routes';
import brandsRoutes from './routes/Brand.routes';
import categoriesRoute from './routes/Categories.routes';
import couponRoutes from './routes/Coupon.routes';
import customerRoutes from './routes/Customer.routes';
import expensesRoutes from './routes/Expenses.routes';
import productImagesRoute from './routes/Image.routes';
import productsRoute from './routes/Products.routes';
import purchasesRoute from './routes/Purchase.routes';
import storesRoutes from './routes/Store.routes';
import suppliersRoutes from './routes/Suppliers.routes';
import userRoutes from './routes/Users.routes';
import warehouseRoutes from './routes/Warehouse.routes';
import warrantyRoutes from './routes/Warranty.routes';
import salesRoutes from './routes/Sales.routes';
import checkUserAuthToken from './middleware/checkUserAuthToken';
import verifyUserAccessToken from './middleware/verifyUserAccessToken';
import cookieParser from 'cookie-parser';
import checkCustomerAuthToken from './middleware/checkCustomerAuthToken';
import verifyCustomerAccessToken from './middleware/verifyCustomerAccessToken';

configDotenv();

const app = express();

app
  .use(express.json())
  .use(cors({
    origin:process.env._CLIENT_URI,
    methods:["GET","POST","PATCH","PUT","DELETE"],
    credentials: true,
  }))
  .use(helmet())
  .use(morgan(process.env.NODE_ENV==="production" ? "combined" :'dev'))
  .use(cookieParser())

  .use("/api/v1/users", userRoutes)
  .use("/api/v1/auth", authRoutes)
  .use("/api/v1/stores",checkUserAuthToken,verifyUserAccessToken,checkCustomerAuthToken,verifyCustomerAccessToken, storesRoutes)
  .use("/api/v1/warehouses",checkUserAuthToken,verifyUserAccessToken, warehouseRoutes)
  .use("/api/v1/categories",checkUserAuthToken,verifyUserAccessToken, categoriesRoute)
  .use("/api/v1/attributes",checkUserAuthToken,verifyUserAccessToken, attributesRoute)
  .use("/api/v1/brands",checkUserAuthToken,verifyUserAccessToken, brandsRoutes)
  .use("/api/v1/products",checkUserAuthToken,verifyUserAccessToken, productsRoute)
  .use("/api/v1/product-images",checkUserAuthToken,verifyUserAccessToken, productImagesRoute)
  .use("/api/v1/purchases",checkUserAuthToken,verifyUserAccessToken, purchasesRoute)
  .use("/api/v1/expenses",checkUserAuthToken,verifyUserAccessToken, expensesRoutes)
  .use("/api/v1/customers",checkUserAuthToken,verifyUserAccessToken, customerRoutes)
  .use("/api/v1/coupons",checkUserAuthToken,verifyUserAccessToken, couponRoutes)
  .use("/api/v1/suppliers",checkUserAuthToken,verifyUserAccessToken, suppliersRoutes)
  .use("/api/v1/warranties", checkUserAuthToken,verifyUserAccessToken,warrantyRoutes)
  .use('/api/v1/sales',checkUserAuthToken,verifyUserAccessToken, salesRoutes);





export default app;
