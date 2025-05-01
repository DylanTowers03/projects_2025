import app from './app.js';
import {connectDB} from './db.js';
import { config } from './config.js';

connectDB();
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
    });
