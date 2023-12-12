import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/userModel.js';

//@desk    Create new order
//@route   POST /api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems: orderItems.map((e) => ({
				...e,
				product: e._id,
				_id: undefined,
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createOrder = await order.save();

		res.status(200).json(createOrder);
	}
});

//@desk    Get logged in user orders
//@route   GET /api/orders/mine
//@access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const orders = await Order.find({ user: userId });
	res.status(200).json(orders);
});

//@desk    Get order by ID
//@route   GET /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const order = await Order.findById(id).populate('user', 'name email');
	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error('Order not found');
	}
});

//@desk    Update order to paid
//@route   GET /api/orders/:id/pay
//@access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	res.send('order is paid');
});

//@desk    Update order to delivered
//@route   GET /api/orders/:id/delivered
//@access  Private / admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	res.send('order is delivered');
});

//@desk    Get All orders
//@route   GET /api/orders/
//@access  Private / admin
const getOrders = asyncHandler(async (req, res) => {
	res.send('get all orders');
});

export {
	addOrderItems,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	updateOrderToPaid,
	getOrderById,
};
