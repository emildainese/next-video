import { getSession } from 'next-auth/client';
import handler from '@/lib/handler';
import db from '@/db/models/index.mjs';
import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';
import { MAX_VIDEO_FILE_SIZE } from '@/constants/file';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const parseForm = async (req) =>
  await new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: MAX_VIDEO_FILE_SIZE,
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

//Only in dev
const NGROK_BASE_URL = process.env.NGROK_BASE_URL;

const upload = async (video, transformation) => {
  const filename = video.originalFilename.split('.')[0];
  return await cloudinary.v2.uploader.upload(video.filepath, {
    resource_type: 'video',
    public_id: `next_video/${filename}`,
    eager: [transformation],
    eager_async: true,
    notification_url: `${NGROK_BASE_URL}/api/notification`,
    eager_notification_url: `${NGROK_BASE_URL}/api/notification/eager`,
  });
};

const uploadVideo = async (data, transformation) => {
  return await upload(data.files.video, transformation);
};

export default handler.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) {
      throw new Error('Error: Not authorized - Please sign in');
    }

    const data = await parseForm(req);
    if (!data.files || !data.fields) {
      throw new Error('Error: Please fill in the form and upload a video');
    }

    const {
      title,
      description,
      privacy,
      fileName,
      fileSize,
      uploadedBy,
      category,
      videoWidth,
      videoHeight,
      quality,
      background,
      crop,
      rotate,
      format,
      effects,
    } = data.fields;

    if (!category || category.length === 0) {
      throw new Error('Error: Please select a video category.');
    }

    const cdRes = await uploadVideo(data, {
      width: +videoWidth,
      height: +videoHeight,
      quality: +quality,
      ...(crop !== '' && { crop }),
      ...(rotate !== 0 && { rotate }),
      ...(background !== '#000000' && { background }),
      ...(format !== 'mp4'
        ? { fetch_format: format }
        : { fetch_format: 'mp4' }),
      ...(effects && { effects }),
    });

    const [user, videoCategory] = await Promise.all([
      db.User.findOne({
        where: { username: session.user.name },
        attributes: ['id'],
        raw: true,
      }),
      db.Category.findOne({
        where: { name: category },
        attributes: ['id'],
        raw: true,
      }),
    ]);

    if (!user || !videoCategory) {
      throw new Error('Error: Databse connection error.');
    }

    const { duration, asset_id, public_id, eager, url } = cdRes;

    await db.Video.create({
      title,
      description,
      privacy,
      format,
      duration: +duration,
      originalFileName: fileName,
      fileSize: +fileSize.split(' ')[0],
      uploadedBy,
      width: videoWidth,
      height: videoHeight,
      userId: user.id,
      categoryId: videoCategory.id,
      publicId: public_id,
      batchId: eager[0].batch_id,
      assetId: asset_id,
      url,
    });

    res.status(200).json({
      success: true,
      message: 'Video successfully aploaded',
      data: cdRes,
    });
  } catch (err) {
    throw new Error(err || err.message);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
