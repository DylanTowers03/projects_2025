import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import {validateToken} from '../middlewares/validateToken.js' 
const router = Router();

router.post("/register",AuthController.register);

router.post("/login",AuthController.login);
router.post("/logout",AuthController.logout);
router.get("/profile", validateToken,AuthController.profile)


export default router;