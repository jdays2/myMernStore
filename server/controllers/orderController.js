import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/userModel.js';

//@desk    Create new order
//@route   POST /api/orders
//@access  Private
const addOrderItems = asyncHandler(async (req, res) => {
	res.send('add order item');
});

//@desk    Get logged in user orders
//@route   GET /api/orders/mine
//@access  Private
const getMyOrders = asyncHandler(async (req, res) => {
	res.send('get orders');
});

//@desk    Get order by ID
//@route   GET /api/orders/:id
//@access  Private
const getOrderById = asyncHandler(async (req, res) => {
	res.send('get order by id');
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
//@route   GET /api/orders/:id/delivered
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
