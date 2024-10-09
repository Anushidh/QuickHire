import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Get the MONGO_URI from the environment variables
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }
    await mongoose.connect(mongoURI)
    console.log('database connected')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Database connection error: ${error.message}`); // Access the error message safely
    } else {
      console.error("An unknown error occurred during database connection.");
    }
    process.exit(1)
  }
}

export default connectDB