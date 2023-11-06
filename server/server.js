import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/bd.js';
import productRoutes from './routes/productRoutes.js'
const port = process.env.PORT || 8000;

connectDB() //подключаемся в bd

const app = express();

app.use(cors()) //добавляетм cors

app.use('/api/products', productRoutes)


app.listen(port, () => {
	console.log(`Server is running on ${port} port`);
});