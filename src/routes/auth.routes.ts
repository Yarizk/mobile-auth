import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import { registerUser, loginUser, validateOTP, loginGoogle, sendNewOTP } from '../controller/auth.controller';
import { loginSchema, otpSchema, registerSchema } from '../schema/validationSchema';
import { requireAuth } from '../middlewares/auth.middlewares';
import passport from "passport";

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

router.post(
    '/newOTP',
    requireAuth,
    sendNewOTP,
)

router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] })); //define this scope to have access to the email

router.get(
    '/login/google/callback',
    passport.authenticate("google", { failureRedirect: "/auth/google" }),
     loginGoogle,
)

export default router;
