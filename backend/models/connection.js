import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_DB_URI } = process.env;

export const connectDB = async () => {
  try {
    if (!MONGO_DB_URI) {
      throw new Error(
        "MONGO_DB_URI is not defined in the environment variables"
      );
    }

    // Connect to MongoDB with options
    const connection = await mongoose.connect(MONGO_DB_URI);

    console.log("MONGODB CONNECTED", connection.connection.host);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process with failure code
  }
};
