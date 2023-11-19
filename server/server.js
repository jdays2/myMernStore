import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/bd.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
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

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is running on ${port} port`);
});
