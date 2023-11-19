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

const router = express.Router();

router.route('/').get(getUsers).post(registerUser)
router.post('/login', authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)


export default router;
