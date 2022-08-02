import handler from '@/lib/handler';
import db from '@/db/models/index.mjs';
import jwt from 'jsonwebtoken';

export default handler.post(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      error: 'Could not activate your account: missing activation token',
      activate: false,
    });
  }

  const user = await db.User.findOne({
    where: { activationToken: token },
    attributes: ['username', 'email', 'activationToken'],
  });

  const foundUser = user.toJSON();

  if (!foundUser) {
    return res.status(404).json({
      error: 'Could not activate your account: user not found',
      activate: false,
    });
  }

  try {
    const decoded = jwt.verify(
      foundUser.activationToken,
      process.env.JWT_ACTIVATION_TOKEN_SECRET
    );

    if (decoded) {
      const { username, email } = decoded;

      if (username === foundUser.username && email === foundUser.email) {
        await db.User.update(
          { status: 'active', activationToken: null },
          { where: { username } }
        );

        delete foundUser.activationToken;

        res.status(201).json({
          message: 'Account activation succeeded',
          activate: true,
          user: foundUser,
        });
      }
    } else {
      res.status(401).json({
        message: 'Could not activate your account: invalid token signature',
        activate: false,
      });
    }
  } catch (err) {
    //Check and handle jwt errors
    throw new Error(err.message);
  }
});
