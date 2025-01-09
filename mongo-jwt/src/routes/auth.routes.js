
import { Router } from 'express';
import  {signIn, signUp} from '../controllers/auth.controller.js';
import {checkUserExisted,checkRolesExisted} from '../middlewares/verifySignup.middleware.js';

const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
router.post('/signup',[checkUserExisted,checkRolesExisted], signUp);
router.post('/signin',signIn);

export default router;

