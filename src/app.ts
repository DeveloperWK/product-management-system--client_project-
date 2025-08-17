import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/Auth.route';
import categoriesRoute from './routes/Categories.route';
import productsRoute from './routes/Products.route';
import storesRoutes from './routes/Store.routes';
import userRoutes from './routes/Users.route';
import warehouseRoutes from './routes/Warehouse.route';

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
app.use('/api/v1/products', productsRoute);

export default app;
