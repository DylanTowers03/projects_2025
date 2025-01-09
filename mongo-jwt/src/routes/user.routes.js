import { Router } from "express";
import {createUser} from "../controllers/user.controller.js";
import {checkUserExisted, checkRolesExisted} 
from "../middlewares/verifySignup.middleware.js";
import {verifyToken, isAdmin} from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/user', [verifyToken, isAdmin,checkUserExisted], createUser);

export default router;

