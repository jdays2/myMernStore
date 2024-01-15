const createToken = (res, userId) => {
	console.log('Entering createToken function');
	
	try {
			const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
					expiresIn: '30d',
			});

			console.log('Token created successfully:', token);

			// Set JWT as an HTTP-Only cookie
			res.cookie('jwt', token, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
					sameSite: 'strict', // Prevent CSRF attacks
					maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			});
	} catch (error) {
			console.error('Error creating token:', error);
			throw error;
	}
};

export default createToken;