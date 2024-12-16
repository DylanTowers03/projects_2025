import { Application, Router } from 'express';
import { UserController} from '../controllers/user.controller';

export class UserRoutes{
    userController= new UserController();
    public router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/users', this.userController.getUsers);
        this.router.get('/users/:id', this.userController.getUserById);
        this.router.post('/register', this.userController.register);
        this.router.post('/login', this.userController.login);
        this.router.put('/users/:id', this.userController.updateUser);
        this.router.delete('/users/:id', this.userController.deleteUser);
    }
}