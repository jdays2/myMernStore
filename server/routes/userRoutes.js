import express from 'express';
import {
	authUser,
	logoutUser,
	registerUser,
	getUserProfile,
	getUserById,
	getUsers,
	updateUser,
	updateUserProfile,
	deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authHandler.js';

const router = express.Router();

router
	.route('/')
	.get(protect, admin, getUsers)
	.post(protect, admin, registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.get(protect, admin, getUserById)
	.put(protect, admin, updateUser)
	.delete(protect, admin, deleteUser);

export default router;
