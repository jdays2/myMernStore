import express from 'express';
import {
	createProduct,
	getProduct,
	getProductByID,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';

const router = express.Router();

router.route('/').get(getProduct).post(protect, admin, createProduct);
router.route('/:id').get(getProductByID);

export default router;
