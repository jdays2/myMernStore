import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

//@desk fetch all products
//@route GET /api/products
//@access Public
export const getProduct = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

//@desk fetch one product by id
//@route GET /api/products/:id
//@access Public
export const getProductByID = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);

	if (product) {
		res.json(product);
	}

	res.status(404).json({ message: 'Product not find' });
});
