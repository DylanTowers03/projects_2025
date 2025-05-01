import { Router } from "express";
import {TaskController} from '../controllers/task.controller.js';
import {validateToken} from '../middlewares/validateToken.js';



const router = Router();

router.post("/tasks",TaskController.create);
router.get("/tasks",validateToken,TaskController.read);
router.put("/tasks",TaskController.update);
router.delete("/tasks",TaskController.delete);


export default router;