import asyncHandler from '../middleware/asyncHandler.cjs';
import Product from '../models/productModel.cjs';

//@desk fetch all products
//@route GET /api/products
//@access Public
export const getProduct = asyncHandler(async (req, res) => {
	const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};

	const count = await Product.countDocuments(keyword);

	const products = await Product.find(keyword)
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desk fetch 3 top products by rating
//@route GET /api/products/top
//@access Public
export const getTopProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	res.status(200).json(products);
});

//@desk fetch one product by id
//@route GET /api/products/:id
//@access Public
export const getProductByID = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404).json({ message: 'Product not find' });
	}
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

		const updatedProduct = await product.save();

		res.status(200).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product is not found');
	}
});

//@desk Delete product
//@route DELETE /api/products/:id/delete
//@access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const product = await Product.findById(id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.status(200).json({ message: 'Product successfully deleted' });
	} else {
		res.status(404);
		throw new Error('Product is not found');
	}
});

//@desk Create review
//@route POST /api/products/:id/reviews
//@access Private
export const createReview = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const { rating, comment } = req.body;

	const product = await Product.findById(id);

	if (product) {
		const reviews = product.reviews.find((p) => p.user.equals(req.user._id));

		if (reviews) {
			res.status(400);
			throw new Error('Review already exist');
		} else {
			const newReview = {
				user: req.user._id,
				name: req.user.name,
				rating: Number(rating),
				comment,
			};

			product.reviews.push(newReview);

			const countReview = Number(product.reviews.length);

			const valueReview = Number(
				product.reviews.reduce((a, x) => x.rating + a, 0) / countReview,
			);

			product.numReviews = countReview;
			product.rating = valueReview;

			const createdReview = await product.save();

			res.status(200).json(createdReview);
		}
	} else {
		res.status(404);
		throw new Error('Product is not found');
	}
});
