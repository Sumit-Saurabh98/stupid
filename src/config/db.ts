import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = process.env.MONGO_URI as string;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL);
    console.log(`Connected MongoDB: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Failed to connect MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
