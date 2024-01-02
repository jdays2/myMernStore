import express from 'express';
import {
	createProduct,
	getProduct,
	getProductByID,
	updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').get(getProduct).post(protect, admin, createProduct);
router.route('/:id').get(getProductByID).put(protect, admin, updateProduct);

export default router;
