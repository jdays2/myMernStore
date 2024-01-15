import express from 'express';
import {
	addOrderItems,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
	updateOrderToPaid,
	getOrderById,
} from '../controllers/orderController.cjs';
import { protect, admin } from '../middleware/authHandler.cjs';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);

export default router;
