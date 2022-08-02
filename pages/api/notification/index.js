import handler from '@/lib/handler';
import db from '@/db/models/index.mjs';

export default handler.post(async (req, res) => {
  const { notification_type, public_id, asset_id, url, secure_url, eager } =
    req.body;

  const { batch_id } = eager[0];

  if (!batch_id) return;

  console.log('notification type:', notification_type.toUpperCase());
  console.log('notification body:', req.body);

  try {
    const video = await db.Video.findOne({
      where: { batchId: batch_id },
      attributes: ['userId'],
      raw: true,
    });

    if (!video) return;

    const notification = await db.Notification.create(
      {
        userId: video.userId,
        notificationType: notification_type,
        secureUrl: secure_url,
        url: url,
        batchId: batch_id,
        assetId: asset_id,
        publicId: public_id,
      },
      { raw: true }
    );

    res.status(200).json({ notification });
  } catch (error) {
    throw new Error(error);
  }
});
