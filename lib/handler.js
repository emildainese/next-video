import nextConnect from 'next-connect';
import multer from 'multer';

const handler = nextConnect({
  onError(err, req, res) {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        error: `Image uplaod fail: ${
          typeof err === 'string'
            ? err
            : err.message
            ? err.message
            : 'Error: Upload image fail'
        }`,
      });
    }

    console.error(err);

    const error =
      typeof err === 'string'
        ? err
        : err.message
        ? err.message
        : err.error
        ? err.error
        : 'Error: unknow error';

    res
      .status(500)
      .json({ error: `Error: Sorry something went wrong! ${error}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Error: Method ${req.method} Not Allowed` });
  },
});

export default handler;
