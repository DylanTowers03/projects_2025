import mongoose from 'mongoose';
import { config } from './config.js';

mongoose.connect('mongodb://mongo:27017/' + config.database)
    .then(db => console.log('DB is connected'))
    .catch(error => console.log(error));

