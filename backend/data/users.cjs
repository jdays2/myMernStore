import bcrypt from 'bcryptjs';

const users = [
	{
		isAdmin: true,
		name: 'Admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		isAdmin: false,
		name: 'Vitaly',
		email: 'vitaly@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		isAdmin: false,
		name: 'Mark',
		email: 'mark@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		isAdmin: false,
		name: 'Kirill',
		email: 'kirill@gmail.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
