import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`.yellow.inverse)
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse)
    process.exit(1);
  }
}

export default connectDB