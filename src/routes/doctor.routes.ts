import { Router } from 'express';
import { nearestDoctor } from '../controller/doctor.controller';
import { requireAuth } from '../middlewares/auth.middlewares';


const router = Router();



router.post(
    '',
    requireAuth,
    nearestDoctor,
);

export default router;