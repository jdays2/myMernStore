import express from 'express';
import {
	createProduct,
	createReview,
	deleteProduct,
	getProduct,
	getProductByID,
	getTopProducts,
	updateProduct,
} from '../controllers/productController.cjs';
import { protect, admin } from '../middleware/authHandler.cjs';

const router = express.Router();

router.route('/').get(getProduct).post(protect, admin, createProduct);
router.route('/top').get(getTopProducts);
router
	.route('/:id')
	.get(getProductByID)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createReview);

export default router;
