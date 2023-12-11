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

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').get(protect, updateOrderToPaid);
router.route('/:id/delivered').get(protect, admin, updateOrderToDelivered);

export default router;
