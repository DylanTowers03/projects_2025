import { Application, Router } from 'express';
import { ProductController, ProductTypeController} from '../controllers/product.controller';

export class ProductRoutes{
    productController= new ProductController();
    productTypeController= new ProductTypeController();
    public router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        //rutas products
        this.router.get('/products', this.productController.getAll);
        this.router.get('/products/:id', this.productController.getById);
        this.router.post('/products', this.productController.create);
        this.router.patch('/products/:id', this.productController.update);
        this.router.delete('/products/:id', this.productController.delete);
        //rutas products_types
        this.router.get('/product_types', this.productTypeController.getAll);
        this.router.get('/product_types/:id', this.productTypeController.getById);
        this.router.post('/product_types', this.productTypeController.create);
        this.router.patch('/product_types/:id', this.productTypeController.update);
        this.router.delete('/product_types/:id', this.productTypeController.delete);
    }
}