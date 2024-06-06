import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getProfile, updateProfile, updateProfilePicture } from '../controller/user.controller';
import { upload } from '../config/multer.config';
import { requireAuth } from '../middlewares/auth.middlewares';


const router = Router();

router.get(
    '/profile', 
    requireAuth, 
    getProfile
); 

router.put(
    '/update', 
    requireAuth, 
    updateProfile
);

router.post(
    '/update/picture', 
    requireAuth, 
    upload.single('profilePic'), 
    updateProfilePicture);

export default router;