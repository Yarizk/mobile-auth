import { Router } from 'express';
import { nearestDoctor } from '../controller/doctor.controller';
import { requireAuth } from '../middlewares/auth.middlewares';
import { celebrate } from 'celebrate';
import { nearestDoctorSchema } from '../schema/validationSchema';


const router = Router();



router.post(
    '',
    requireAuth,
    celebrate(nearestDoctorSchema),
    nearestDoctor,
);

export default router;