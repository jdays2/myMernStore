import express from 'express';
import {
	addOrderItems,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	updateOrderToPaid,
	getOrderById,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authHandler.js';

const router = express.Router();

router
	.route('/')
	.get(protect, admin, getUsers)
	.post(registerUser);

export default router;
