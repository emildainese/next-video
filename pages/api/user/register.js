import handler from '@/lib/handler';
import db from '@/db/models/index.mjs';
import imageUpload from '@/middleware/imageUpload';
import jwt from 'jsonwebtoken';
import { sendEmail, activationMessage } from '@/lib/email';

export default handler.use(imageUpload).post(async (req, res) => {
  try {
    let profilePic = '';

    if (req.file) {
      profilePic = `${req.file.filename}`;
    }

    const { username, email } = req.body;

    const activationToken = jwt.sign(
      { email: email, username: username },
      process.env.JWT_ACTIVATION_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACTIVATION_TOKEN_EXPIRE }
    );

    try {
      await db.User.create({
        ...req.body,
        profilePic,
        activationToken,
      });

      const activationUrl = `${req.headers.origin}/auth/activate/${activationToken}`;

      await sendEmail({
        email: email,
        subject: 'Account Activation',
        message: activationMessage(username, activationUrl),
      });
    } catch (err) {
      throw new Error(err || err.error);
    }

    delete req.body.password;

    res.status(200).json({
      message: `We have sent an email at ${email} for activate your account.`,
      user: { ...req.body },
    });
  } catch (err) {
    throw new Error(err || err.error);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
