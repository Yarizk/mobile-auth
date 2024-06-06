import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getProfile, updateProfile, updateProfilePicture } from '../controller/user.controller';
import { upload } from '../config/multer.config';
import { requireAuth } from '../middlewares/auth.middlewares';
import { updateProfileSchema } from '../schema/validationSchema';


const router = Router();

router.get(
    '/profile', 
    requireAuth, 
    getProfile
); 

router.put(
    '/update', 
    requireAuth,
    celebrate(updateProfileSchema),
    updateProfile
);

router.post(
    '/update/picture', 
    requireAuth, 
    // upload.single('image') ,
    updateProfilePicture
);

export default router;