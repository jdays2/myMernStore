import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/bd.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js';
const port = process.env.PORT || 8000;

connectDB(); //подключаемся в bd

const app = express();

//добавляетм cors
app.use(cors());

// Middleware для автоматического парсинга JSON
app.use(express.json());

// Middleware для парсинга данных формы в формате x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Middleware для парсинга данных cookie
app.use(cookieParser())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on ${port} port`);
});
