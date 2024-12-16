import express, { Application } from 'express';
import { config } from './env';
import morgan from 'morgan';
import { Routes} from '../routes/Routes'
import cookieParser from 'cookie-parser';
export class App{
    app: Application;
    private route= new Routes();
    constructor(private port?:number|string){
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }
    private settings() {
        this.app.set('port', this.port || config.port || 3000);
    }

   async listen() {
        await this.app.listen(this.app.get('port'));
        // await this.app.listen(this.port);
        // console.log('Server on port', this.port);
        console.log('Server on port', this.app.get('port'));
    }
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); // leer json raw
        this.app.use(express.urlencoded({ extended: false })); //leer json form
        this.app.use(cookieParser()); // Habilitar el middleware para cookies
    }
    private routes(){
        this.app.use('/api', this.route.usersRoutes.router)
        this.app.use('/api', this.route.productRoutes.router)
    }
}