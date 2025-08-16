import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoute from './routes/Auth.route';
import userRoute from './routes/Users.route';
configDotenv();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' });
});

app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

export default app;
