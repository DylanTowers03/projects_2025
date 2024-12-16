import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME || "nombrebd";
const DB_USER = process.env.DB_USER || "user";
const DB_PASS = process.env.DB_PASS || "pass";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;

export const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: "mysql",
    port: +DB_PORT,
});

async function generateDb() {
    try {
        await database.sync({ force: false });
        console.log("Base de datos y tablas creadas");
    } catch (error) {
        console.error("Error al sincronizar la base de datos", error);
    }
}

generateDb();
