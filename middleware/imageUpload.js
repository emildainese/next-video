import path from 'path';
import nextConnect from 'next-connect';
import { MAX_IMAGE_FILE_SIZE } from '@/constants/file';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(path.resolve(), 'public', 'users'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.')[0]}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkFileType(file, cb) {
  if (/(jpe?g|png)$/.test(file.mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid mime type'), false);
  }
}

const FIELD_NAME = 'profilePic';

const imageUploader = multer({
  limits: {
    fileSize: MAX_IMAGE_FILE_SIZE,
  },
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single(FIELD_NAME);

const imageUpload = nextConnect();

imageUpload.use(imageUploader);

export default imageUpload;
