import express from 'express';
import {
	getProduct,
	getProductByID,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProduct);
router.route('/:id').get(getProductByID);

export default router;
