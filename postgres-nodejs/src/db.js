import pg from 'pg';
import {config  } from "./config.js";
export const pool = new pg.Pool({ 
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.dbPort,
});
