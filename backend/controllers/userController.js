import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import createToken from '../utils/createToken.js';

//@desk    auth user & get token
//@route   POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		createToken(res, user._id);

		res.status(200).json({
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
	const { name, email, password } = req.body;

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error('User is already exist');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		createToken(res, user._id);
		res.status(201).json({
			name: user.name,
			email: user.email,
			_id: user._id,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

//@desk   Logout  user / clear cookie
//@route   POST /api/users/logout
//@access  Private
const logoutUser = asyncHandler(async (req, res) => {
	//delete cookie
	res.cookie('jwt', '', {
		expiresIn: new Date(),
	});
	res.status(200).json({ message: 'Logout is successful' });
});

//@desk    Get user profile
//@route   GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.status(200).json({
			name: user.name,
			email: user.email,
			_id: user._id,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User is not found');
	}
});

//@desk    Update user profile
//@route   PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.status(200).json({
			name: updatedUser.name,
			email: updatedUser.email,
			_id: updatedUser._id,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User is not found');
	}
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
