import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getProfile, updateProfile, updateProfilePicture } from '../controller/user.controller';
import { upload } from '../config/multer.config';
import { requireAuth } from '../middlewares/auth.middlewares';
import { get } from 'http';
// import { updateProfileSchema, profilePictureSchema } from '../schema/validationSchema';

const router = Router();

router.get(
    '/profile', 
    requireAuth, 
    // celebrate({ query: profileSchema }), 
    getProfile
); 

router.get(
    '/profile/picture', 
    requireAuth, 
    // celebrate({ query: profilePictureSchema }), 
    updateProfilePicture
);

router.put(
    '/update', 
    requireAuth, 
    // celebrate({ body: updateProfileSchema }), 
    updateProfile
);

router.post(
    '/update/picture', 
    requireAuth, 
    upload.single('profilePic'), 
    // celebrate({ body: profilePictureSchema }), 
    updateProfilePicture);

export default router;