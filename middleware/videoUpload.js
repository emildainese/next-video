import nextConnect from 'next-connect';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { MAX_VIDEO_FILE_SIZE } from '@/constants/file';

const cloud = cloudinary.v2;

const FIELD_NAME = 'video';

cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: 'Next Video',
    format: 'mp4',
  },
});

const videoUploader = multer({
  storage: storage,
  limits: {
    fileSize: MAX_VIDEO_FILE_SIZE,
    fieldSize: 25 * 1024 * 1024,
  },
});

const singleVideoUploader = videoUploader.single(FIELD_NAME);

const videoUpload = nextConnect();

videoUpload.use(singleVideoUploader);

export default videoUpload;
