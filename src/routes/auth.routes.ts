import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import { registerUser, loginUser, validateOTP } from '../controller/auth.controller';
import { loginSchema, otpSchema, registerSchema } from '../schema/validationSchema';
import { requireAuth } from '../middlewares/auth.middlewares';


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



router.post(
    '/otp',
    requireAuth,
    celebrate(otpSchema),
    validateOTP,
)

export default router;
