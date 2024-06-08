import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controller/auth.controller';
import { loginSchema, registerSchema } from '../schema/validationSchema';


const router = Router();

router.post(
    '/register', 
    celebrate(registerSchema),
    registerUser
);
router.post(
    '/login', 
    celebrate(loginSchema),
    loginUser
);

export default router;
