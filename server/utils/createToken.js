import jwt from 'jsonwebtoken';

export const createToken = (res, userId) => {
	//create jwt token
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	//set jwt as cookie
	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});
};
