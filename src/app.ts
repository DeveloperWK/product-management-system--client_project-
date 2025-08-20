import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import attributesRoute from './routes/Attribute.routes';
import authRoutes from './routes/Auth.routes';
import brandsRoutes from './routes/Brand.routes';
import categoriesRoute from './routes/Categories.routes';
import productImagesRoute from './routes/Image.routes';
import productsRoute from './routes/Products.routes';
import purchasesRoute from './routes/Purchase.routes';
import storesRoutes from './routes/Store.routes';
import userRoutes from './routes/Users.routes';
import warehouseRoutes from './routes/Warehouse.routes';

configDotenv();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' });
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/stores', storesRoutes);
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/attributes', attributesRoute);
app.use('/api/v1/brands', brandsRoutes);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/product-images', productImagesRoute);
app.use('/api/v1/purchases', purchasesRoute);

export default app;
