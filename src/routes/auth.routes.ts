import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controller/auth.controller';
// import { registerValidationRules } from '../schema/validationSchema';


const router = Router();

router.post(
    '/register', 
    registerUser
);
router.post(
    '/login', 
    // celebrate({ body: loginSchema }), 
    loginUser
);

export default router;
