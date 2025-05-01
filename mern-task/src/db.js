import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/mern-task", {

        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error: ", error);
    }
    }