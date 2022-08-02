import nextConnect from 'next-connect';
import { getSession } from 'next-auth/client';

const session = async (req, res, next) => {
  const session = await getSession({ req });

  if (session) {
    req.user = session.user.name;
  } else {
    req.user = null;
  }

  next();
};

const sessionMdw = nextConnect();

sessionMdw.use(session);

export default sessionMdw;
