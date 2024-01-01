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

//@desk create a product
//@route POST /api/products
//@access Private / Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description',
	});

	try {
		const created = await product.save();
		res.status(200).json(created);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

//@desk    Edit product
//@route PUT /api/products/:id
//@access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const { name, price, image, brand, category, countInStock, description } =
		req.body;

	const product = await Product.findById(id);

	if (product) {
		product.name = name;
		product.price = price;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;
		product.description = description;

		const updatedProduct = await user.save();

		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product is not found');
	}
});
