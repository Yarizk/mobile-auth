import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');  
  },
  filename: function(req, file, cb) {
    file.originalname = file.originalname.replace(/\s/g, '-');
    cb(null, req.currentUser?.id + '-' + file.originalname);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5  // 5MB file size limit
  },
  fileFilter: fileFilter
});
