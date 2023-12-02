import jwt from 'jsonwebtoken';

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

//@desk    auth user & get token
//@route   POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	//create jwt token
	const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {
		expiresIn: '1d',
	})
	//set jwt as cookie
	res.cookie('jwt',token,{
		httpOnly:true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000 // 1 day
	})

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

//@desk    Register user
//@route   POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
	res.send('register user');
});

//@desk   Logout  user / claer cookie
//@route   POST /api/users/logout
//@access  Privat
const logoutUser = asyncHandler(async (req, res) => {
	res.send('logout user');
});

//@desk    Get user profile
//@route   GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	res.send(' get user profile');
});

//@desk    Update user profile
//@route   PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	res.send('update user profile');
});

//@desk    Get all users
//@route   GET /api/users
//@access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
	res.send('get all users');
});

//@desk    Delete user
//@route   DELETE /api/users/:id
//@access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
	res.send('delete user');
});

//@desk    Get user by id
//@route   GET /api/users/:id
//@access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
	res.send('get user by id');
});

//@desk    Update user
//@route   PUT /api/users/:id
//@access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
	res.send('update user');
});

export {
	authUser,
	logoutUser,
	registerUser,
	getUserProfile,
	getUserById,
	getUsers,
	updateUser,
	updateUserProfile,
	deleteUser,
};
