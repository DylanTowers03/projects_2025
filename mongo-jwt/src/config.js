import { mongo } from "mongoose";

export const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    database: process.env.DB_NAME,
    secretPassword: process.env.SECRET,
    adminEmail: process.env.ADMIN_EMAIL,
    adminUsername: process.env.ADMIN_USERNAME,
    adminPassword: process.env.ADMIN_PASSWORD,
};
