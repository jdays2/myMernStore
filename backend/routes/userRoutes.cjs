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
} from '../controllers/userController.cjs';
import { protect, admin } from '../middleware/authHandler.cjs';

const router = express.Router();

router
	.route('/')
	.get(protect, admin, getUsers)
	.post(registerUser);
router.post('/login', authUser);
router.post('/logout', protect, logoutUser);
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
