import mongoose from "mongoose";
import { SECRET } from "./env";


let cached = false;

// DATABASE CONNECTION
const connectDB = async () => {
    if (cached || mongoose.connection.readyState === 1) return;

    if (!SECRET.DB_URI) throw new Error("MONGODB_URI is not defined");

    try {
        await mongoose.connect(SECRET.DB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            autoIndex: false,
        });

        cached = true;
        console.log("Database connected successfully ✅");

    } catch (error: any) {
        console.error("Database connection failed ❌", error.message);
        throw error;
    }
};

export default connectDB;