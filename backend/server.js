import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/bd.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
const port = process.env.PORT || 8000;

connectDB(); //подключаемся в bd

const app = express();

//добавляетм cors
app.use(cors({ origin: true, credentials: true }));

// Middleware для автоматического парсинга JSON
app.use(express.json());

// Middleware для парсинга данных формы в формате x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Middleware для парсинга данных cookie
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//paypal
app.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on ${port} port`);
});
