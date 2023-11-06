import express from 'express';
import { getProduct, getProductByID } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProduct);

router.get('/:id', getProductByID);

export default router;
