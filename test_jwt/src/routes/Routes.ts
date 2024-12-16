import { UserRoutes } from './user.routes';
import { ProductRoutes } from './product.routes';

export class Routes {
    public usersRoutes = new UserRoutes();
    productRoutes= new ProductRoutes();
}
