import mongoose from 'mongoose';
import connectDB from './config/bd.js';
import dotenv from 'dotenv';
import colors from 'colors';
import products from './data/products.js';
import users from './data/users.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await User.deleteMany();
		await Order.deleteMany();
		await Product.deleteMany();

		//добавил юзеров и выделил админа
		const createdUsers = await User.insertMany(users);
		const admin = createdUsers[0]._id;

		//модифицировал карточки и добавил в базу
		const sampleProducts = products.map((product) => {
			return { ...product, user: admin };
		});

		await Product.insertMany(sampleProducts);

		console.log('Users and Products was recreated!'.green.inverse);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await User.deleteMany();
		await Order.deleteMany();
		await Product.deleteMany();

		console.log('\nAll data was deleted!'.red.bgWhite);
		process.exit();
	} catch (error) {
		console.log(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
} else {
	importData();
}
