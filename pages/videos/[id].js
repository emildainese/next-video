import { useRouter } from 'next/router';
import Link from 'next/link';
import db from '@/db/models/index.mjs';
import { Container, Button } from 'react-bootstrap';
import Fade from '@/components/animations/Fade';
import { serialize } from '@/lib/util';

const PublicVideo = ({ video }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Fade>
      <Container >
        <div>This is the public video with id {id}</div>
        <pre style={{ overflowX: 'hidden' }}>
          {JSON.stringify(video, null, 2)}
        </pre>
        <Link href="/">
          <Button variant="primary" style={{ minWidth: '10%' }}>
            <i className="fas fa-arrow-left me-1"></i> Go Back
          </Button>
        </Link>
      </Container>
    </Fade >
  );
};

export async function getStaticProps({ params }) {
  const { id } = params

  const video = await db.Video.findOne({
    where: { id },
    raw: true,
    attributes: [
      'id',
      'title',
      'description',
      'originalFileName',
      'duration',
      'format',
      'fileSize',
      'height',
      'width',
      'url',
      'createdAt',
    ],
  });

  return {
    props: {
      video: serialize(video)
    },
  };
}

export async function getStaticPaths() {
  const videos = await db.Video.findAll({
    where: { privacy: 'public' },
    limit: 12,
    order: [['createdAt', 'DESC']],
    raw: true,
    attributes: ['id'],
  });

  const videoPaths = videos.map((video) => {
    return {
      params: {
        id: video.id.toString(),
      },
    };
  });

  return {
    paths: videoPaths,
    fallback: 'blocking',
  };
}

export default PublicVideo;
