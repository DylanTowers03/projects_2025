import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createRoles} from './libs/initialRole.js'
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import './database.js';

const app = express();
createRoles();

app.use(morgan('dev'));
app.use(express.json());
app.use(productRoutes);
app.use(authRoutes);
app.use(userRoutes)



export default app;