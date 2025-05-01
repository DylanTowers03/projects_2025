import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import taskRouter from './routes/task.routes.js';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);
app.use(authRouter);
app.use(taskRouter);

export default app;