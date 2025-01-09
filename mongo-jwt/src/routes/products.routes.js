import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";
import {verifyToken,isAdmin, isModerator} from "../middlewares/auth.middleware.js";


const router = Router();

router.get('/products',ProductsController.getProducts);
router.get('/products/:id', ProductsController.getProductById);
router.post('/products',[verifyToken,isModerator],ProductsController.createProduct);
router.put('/products/:id',[verifyToken,isModerator],ProductsController.updateProduct);
router.delete('/products/:id',[verifyToken, isAdmin],ProductsController.deleteProduct);

export default router;
