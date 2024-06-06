import { Router } from 'express';
import { celebrate } from 'celebrate';
import { updateProfile, updateProfilePicture } from '../controller/user.controller';
import { upload } from '../config/multer.config';
import { requireAuth } from '../middlewares/auth.middlewares';
// import { updateProfileSchema, profilePictureSchema } from '../schema/validationSchema';

const router = Router();

router.put(
    '/update', 
    requireAuth, 
    // celebrate({ body: updateProfileSchema }), 
    updateProfile);

router.post(
    '/update/picture', 
    requireAuth, 
    upload.single('profilePic'), 
    // celebrate({ body: profilePictureSchema }), 
    updateProfilePicture);

export default router;