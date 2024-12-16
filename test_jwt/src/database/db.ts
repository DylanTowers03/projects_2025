import {config} from '../config/env'
const Sequelize = require('sequelize');

const DB_NAME = config.dbName;

const DB_USER = config.dbUser;

const DB_PASS = config.dbPassword;



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: config.dbHost,
        dialect: 'mysql',
        port: config.dbPort
    }

);


async function generateDb() {
    await database.sync({ force: true })
    console.log('Base de datos y tablas creada');
}

generateDb();
