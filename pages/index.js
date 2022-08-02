import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import db from '@/db/models/index.mjs';
import { useTheme } from '@/context/ThemeContext';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import { ucfirst } from '@/lib/string';
import { serialize } from '@/lib/util';
import * as type from '../store/constants/video';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Fade from '@/components/animations/Fade';
import BackgroundCanvas from '@/components/UI/canvas/BackgroundCanvas';
import Video from '@/components/UI/videos/BaseVideo';
import BaseModal from '@/components/UI/modal/BaseModal';
import {
  LOGIN_NOTIFICATION_TIME_DISABLE_MS,
  LOGIN_NOTIFICATION_TIME_ENABLE_S,
} from '@/constants/time';

const FIRST_RENDER = 'firstRender';

const Notification = dynamic(
  () => import('@/components/UI/notification/Notification'),
  {
    ssr: false,
  }
);

export default function Home({ message, videos, error }) {
  const [session] = useSession();
  const [show, setShow] = useState(false);
  const [err, setError] = useState(error);
  const [msg, setMessage] = useState(message);
  const [isFirstRender, setIsFirstRender] = useState(false);

  const checkVideos = () => videos && videos.length > 0 && !message && !error;
  const dispatch = useDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    if (session && !localStorage.getItem(ls)) {
      setIsFirstRender(true);
      localStorage.setItem(FIRST_RENDER, JSON.stringify(1));
    } else {
      setIsFirstRender(false);
    }
  }, [session]);

  useEffect(() => {
    let timer = null;
    if (session) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
      }, LOGIN_NOTIFICATION_TIME_DISABLE_MS);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [session]);

  useEffect(() => {
    if (!error && !message) {
      dispatch({ type: type.SET_PUBLIC_VIDEOS, payload: videos });
    } else if (message) {
      dispatch({ type: type.SET_MESSAGE, payload: message });
    } else if (error) {
      dispatch({ type: type.SET_ERROR, payload: error });
    }
  }, [videos, message, error]);

  if (!session) {
    return (
      <>
        <Container className='p-5'>
          <Head>
            <title>Next Video</title>
            <meta name="description" content="Next Viedo Application" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Row>
            <Col>
              <h1 className={`lead display-2 text-center text-shadow d-none d-sm-block ${!session && 'text-white'}`}>
                Upload and Transform your favourite Videos
              </h1>
              <div className="text-center">
                <i className="fas fa-film fa-10x text-primary"></i>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className='pb-5'>
          <Row>
            {checkVideos() &&
              videos.map((video, idx) => (
                <Col lg={4} key={idx} className="mb-3">
                  <Card className={`bg-${theme.type} m-0`}>
                    <Video url={video.url} format={video.format} height={25} />
                    <Card.Body>
                      <Link
                        href={`/videos/${video.id}`}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <Button variant="primary">
                          Show Video
                          <i className="ms-2 fas fa-search"></i>
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </>
    );
  }

  return (
    <Fade>
      <>
        {session && isFirstRender && (
          <Notification
            position="top-right"
            close={LOGIN_NOTIFICATION_TIME_ENABLE_S}
            show={show}
            variant="success"
            message={`${ucfirst(
              session.user.name
            )} you are successfully login`}
            header={`Hi ${session.user.name}!`}
          />
        )}

        {error && (
          <BaseModal
            title="Error !"
            variant="danger"
            show={!!err}
            onHide={() => setError(null)}
          >
            {error}
          </BaseModal>
        )}

        {message && (
          <BaseModal
            title="Warning !"
            variant="warning"
            show={!!msg}
            onHide={() => setMessage(null)}
          >
            {message}
          </BaseModal>
        )}

        <Container id="home-section">
          <Head>
            <title>Next Video</title>
            <meta name="description" content="Next Viedo Application" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <BackgroundCanvas />
          <div
            id="home"
            className="p-5 d-flex flex-column align-items-center justify-content-center"
          >
            <h1 className={`lead display-2 text-center d-none d-sm-block ${!session && 'text-white'}`}>
              Start Uploading
            </h1>
            <div className="text-center">
              <i className="fas fa-film fa-10x text-primary"></i>
            </div>
            {session && (
              <div className="text-center mt-3">
                <Link href="/upload">
                  <Button className="btn-lg center">
                    <i className="fas fa-upload"></i>
                    <span className="mx-2">Upload</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Container>

        {session && <Container className='mt-5 pb-5' >
          <Row>
            {checkVideos() &&
              videos.map((video, idx) => (
                <Col lg={4} key={idx} className="mb-3">
                  <Card className={`bg-${theme.type} m-0`}>
                    <Video url={video.url} format={video.format} height={25} />
                    <Card.Body>
                      <Link
                        href={`/videos/${video.id}`}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <Button variant="primary">
                          Show Video
                          <i className="ms-2 fas fa-search"></i>
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
        }
      </>
      )
    </Fade >
  );
}


export async function getStaticProps() {
  let videos = [];

  try {
    videos = await db.Video.findAll({
      where: { privacy: 'public' },
      limit: 12,
      order: [['createdAt', 'DESC']],
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

  } catch (error) {
    return {
      props: {
        error: error.parent ? error.parent.sqlMessage : 'Database connection error.',
      },
    };
  }

  if (videos.length === 0) {
    return {
      props: {
        message: 'No public viedeos available. Please, upload a video!',
      },
    };
  }

  return {
    props: {
      videos: serialize(videos),
    },
    revalidate: 300,
  };
}
