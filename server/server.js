import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './config/bd.js';
import products from './data/products.js';
const port = process.env.PORT || 8000;

connectDB() //подключаемся в bd

const app = express();

app.use(cors()) //добавляетм cors

app.get('/api/products', (req, res) => {
  
	res.json(products);
  console.log('succes')
});

app.get('/api/products/:id', (req, res) => {
	//что бы вытянуть :id можно воспользоваться req.params
	const id = req.params.id;
	const product = products.find((item) => item._id === id);

	res.json(product);
});

app.listen(port, () => {
	console.log(`Server is running on ${port} port`);
});
