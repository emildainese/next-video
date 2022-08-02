import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import ColorPicker from '@/components/UI/inputs/ColorPicker';
import db from '@/db/models/index.mjs';
import Header from '@/components/UI/Header';
import FileUpload from '@/components/UI/inputs/FileUpload';
import Select from '@/components/UI/inputs/Select';
import BaseModal from '@/components/UI/modal/BaseModal';
import PreviewDetails from '@/components/pages/upload/PreviewDetails';
import UploadDetails from '@/components/pages/upload/UploadDetails';
import VideoPreview from '@/components/UI/videos/VideoPreview';
import Fade from '@/components/animations/Fade';
import { AnimatePresence } from 'framer-motion';
import UploadIndicator from '@/components/pages/upload/UploadIndicator';
import { useRouter } from 'next/router';
import { useFileReader } from '@/hooks/UseFileReader';
import { useMediaQuery } from '@/hooks/UseMediaQuery';
import { useNotification } from '@/hooks/UseNotification';
import { useTheme } from '@/context/ThemeContext';
import { UPLOAD_PAGE_BP } from '@/constants/breakpoint';
import {
  DELAY_800MS,
  DISMISS_NOTIFICATION_TIME_MS,
  REVALIDATE_1DAY_S,
} from '@/constants/time';

const StopWatch = dynamic(() => import('@/components/UI/stopwatch/StopWatch'), {
  ssr: false,
});

//TODO Add React-Redux, add Formik validation, remove global xhr in a custom hook
let xhr = null;

//Transformation state and options
const cropOptions = ['crop', 'scale', 'fit', 'pad', 'limit', 'fill'];
const formatOptions = ['mp4', 'webm', 'ogv', 'avi'];
const effects = [];

const transformState = {
  videoWidth: 600,
  videoHeight: 500,
  quality: 60,
  background: '#000000',
  crop: '',
  rotate: 0,
  format: '',
  effects: null,
};

// Upload and preview video state
const initialState = {
  title: '',
  description: '',
  privacy: '',
  category: '',
  fileName: '',
  fileSize: '',
  fileType: '',
  uploadedBy: '',
  width: 0,
  height: 0,
  video: null,
  transformation: transformState,
  videoSrc: '',
};

const UploadPage = ({ categories }) => {
  const [videoDetails, setVideoDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [abort, setAbort] = useState(false);

  const { theme } = useTheme();
  const session = useSession();
  const router = useRouter();
  const show = useNotification(success, DISMISS_NOTIFICATION_TIME_MS);
  const bp = useMediaQuery(`${UPLOAD_PAGE_BP}`);

  const statusTextRef = useRef(null);

  const {
    title,
    description,
    privacy,
    category,
    fileName,
    fileSize,
    fileType,
    video,
    width,
    height,
    transformation,
  } = videoDetails;

  const {
    videoWidth,
    videoHeight,
    quality,
    background,
    crop,
    rotate,
    format,
    effect,
  } = transformation;

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session]);

  useEffect(() => {
    document.body.style.overflowY = 'visible';
    if (success && data) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 1000,
          left: 0,
          behavior: 'smooth',
        });
        clearTimeout(timer);
      }, 1000);
    }
  }, [success, loading, data, video]);

  const videoDetailsHandler = (e) => {
    setVideoDetails({
      ...videoDetails,
      [e.target.name]: e.target.value,
    });
  };

  const videoTransformationHandler = (e) => {
    setVideoDetails({
      ...videoDetails,
      transformation: {
        ...videoDetails.transformation,
        [e.target.name]: e.target.value,
      },
    });
  };

  const {
    fileChangeHandler,
    videoTagRef,
    videoSrcRef,
    loadPreview,
    previewProgress,
  } = useFileReader({ videoDetails, setVideoDetails });

  const dismissFile = () => {
    setVideoDetails(initialState);
    setSuccess(false);
  };

  useEffect(() => {
    if (!width || !height) return;
    if (width !== videoWidth || height !== videoHeight) {
      setVideoDetails({
        ...videoDetails,
        transformation: {
          ...videoDetails.transformation,
          videoWidth: width,
          videoHeight: height,
        },
      });
    }
  }, [width, height]);

  useEffect(() => {
    xhr = new XMLHttpRequest();
    return () => {
      xhr = null;
    };
  }, [abort, success, error]);

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in videoDetails) {
      if (key !== 'videoSrc') {
        if (key !== 'transformation') {
          formData.append(key, videoDetails[key]);
        } else {
          const transform = videoDetails.transformation;
          for (let key in transform) {
            formData.append(key, transform[key]);
          }
        }
      }
    }
    try {
      setLoading(true);
      if (statusTextRef && statusTextRef.current) {
        statusTextRef.current.classList.remove('list-group-item');
        statusTextRef.current.style.display = 'none';
      }
      const res = await uploadVideo(
        '/api/video/upload',
        formData,
        { onProgress: (progress) => setProgress(progress) },
        statusTextRef
      );
      setLoading(false);

      if (typeof res === 'string' && res.includes('aborted')) {
        return setSuccess(false);
      } else if (typeof res === 'object') {
        if ('error' in res) {
          setError(res.error);
        } else {
          setSuccess(true);
          setData(res.data);
        }
      }
    } catch (err) {
      setLoading(false);
      if (typeof err === 'string') {
        setError(err);
      } else if ('message' in err) {
        setError(err.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  const abortUploadHandler = () => {
    if (xhr) {
      xhr.abort();
      setSuccess(false);
      setLoading(false);
      setAbort(true);
    } else {
      setError('Could not abort the request');
    }
  };

  return (
    <Fade>
      <Container className="px-5" fluid>
        <UploadIndicator
          loading={loading}
          loadPreview={loadPreview}
          previewProgress={previewProgress}
          progress={progress}
          show={show}
          fileName={fileName}
        />
        {error && !loading && (
          <BaseModal
            title="Sorry! An error occurred!"
            show={!!error}
            variant="danger"
            onHide={() => setError(null)}
          >
            {error}
          </BaseModal>
        )}
        <Row className={`${!fileName ? 'justify-content-center' : ''} `}>
          <Col
            md={12}
            lg={4}
            className={`mb-2 mb-md-0`}
            style={{ minWidth: '400px' }}
          >
            <Header text="Transformation" icon="fa-tools" />
            <Form className={`shadow p-5 bg-${theme.type}`}>
              {width > 0 && height > 0 && (
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Original Width</Form.Label>
                      <Form.Control type="number" value={width} readOnly />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Original Height</Form.Label>
                      <Form.Control type="number" value={height} readOnly />
                    </Form.Group>
                  </Col>
                </Row>
              )}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Set Width</Form.Label>
                    <Form.Control
                      type="number"
                      name="videoWidth"
                      title="Choose video width"
                      value={videoWidth}
                      onChange={videoTransformationHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Set Height</Form.Label>
                    <Form.Control
                      type="number"
                      name="videoHeight"
                      title="Choose video height"
                      value={videoHeight}
                      onChange={videoTransformationHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Set Quality</Form.Label>
                <Row>
                  <Col>
                    <input
                      type="range"
                      name="quality"
                      className="form-range"
                      min="0"
                      max="100"
                      step="1"
                      title="Choose video quality"
                      value={quality}
                      onChange={videoTransformationHandler}
                    />
                  </Col>
                  <Col md={2} className="px-2">
                    <Form.Control
                      type="text"
                      value={quality}
                      readOnly
                      style={{ minWidth: '45px' }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Set Rotation</Form.Label>
                  <Form.Control
                    type="number"
                    name="rotate"
                    title="Rotate video"
                    value={rotate}
                    onChange={videoTransformationHandler}
                  />
                </Form.Group>
              </Col>
              <Form.Group className="mb-3">
                <Form.Label>Set Crop</Form.Label>
                <Select
                  options={cropOptions}
                  name="crop"
                  title="Choose crop type"
                  value={crop ? crop : 'Choose a crop type'}
                  default="Choose a crop type"
                  onChange={videoTransformationHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Set Format</Form.Label>
                <Select
                  options={formatOptions}
                  name="format"
                  title="Choose video format"
                  value={format ? format : 'Choose a video format'}
                  default="Choose a video format"
                  onChange={videoTransformationHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Set Effects</Form.Label>
                <Select
                  options={effects}
                  name="effect"
                  title="Choose an effect type"
                  value={effect ? effect : 'Choose an effect type'}
                  default="Choose an effect type"
                  onChange={videoTransformationHandler}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Background Color</Form.Label>
                <ColorPicker
                  value={background}
                  onChange={videoTransformationHandler}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col style={{ minWidth: '400px' }} className="mt-0 mt-md-3 mt-lg-0">
            <Header text="Upload a Video" icon="fa-upload" />
            <Form className={`shadow p-5 bg-${theme.type}`}>
              <Form.Group className="mb-3">
                <Form.Label>Upload Time</Form.Label>
                <StopWatch start={loading} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={title}
                  onChange={videoDetailsHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={description}
                  onChange={videoDetailsHandler}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Video Privacy</Form.Label>
                    <Select
                      options={['Private', 'Public']}
                      name="privacy"
                      value={privacy ? privacy : 'Set video privacy'}
                      default="Set video privacy"
                      onChange={videoDetailsHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Video Category</Form.Label>
                    <Select
                      options={categories}
                      name="category"
                      value={category ? category : 'Set a video category'}
                      default="Set a video category"
                      onChange={videoDetailsHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <AnimatePresence>
                {loading && (
                  <Fade id="abort">
                    <Form.Group className="my-3">
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={abortUploadHandler}
                      >
                        Abort
                      </Button>
                    </Form.Group>
                  </Fade>
                )}
              </AnimatePresence>
              <Form.Group>
                <Row>
                  <Col>
                    <FileUpload
                      fileChangeHandler={fileChangeHandler}
                      fileUploadHandler={fileUploadHandler}
                      fileName={fileName}
                      accept="video"
                      loading={loading}
                    />
                  </Col>
                  {video && (
                    <Col>
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={dismissFile}
                        disabled={loading}
                      >
                        Dismiss
                      </Button>
                    </Col>
                  )}
                </Row>
              </Form.Group>
            </Form>
          </Col>
          <AnimatePresence>
            {fileName && (
              <Col
                lg={3}
                style={{ minWidth: bp ? '100%' : '200px' }}
                className={`${bp ? 'mt-3' : 'mt-0'} position-relative`}
              >
                <Header text="Preview" icon="fa-file-video" />
                <Fade id="previewDetails">
                  <VideoPreview
                    videoSrcRef={videoSrcRef}
                    videoTagRef={videoTagRef}
                    ratio={width / height}
                    style={{ maxHeight: 450 }}
                  />
                  <PreviewDetails
                    theme={theme}
                    fileName={fileName}
                    fileSize={fileSize}
                    fileType={fileType}
                    loading={loading}
                    progress={progress}
                    statusTextRef={statusTextRef}
                  />
                </Fade>
              </Col>
            )}
          </AnimatePresence>
        </Row>
        <Row className="mt-3">
          <AnimatePresence>
            {success && data && (
              <Fade id="uplodDetails">
                <UploadDetails data={data} theme={theme} />
              </Fade>
            )}
          </AnimatePresence>
        </Row>
        <Row className="mt-3">
          <Container className="p-3">
            <Link href="/">
              <Button variant="primary" style={{ minWidth: '10%' }}>
                <i className="fas fa-arrow-left me-1"></i> Go Back
              </Button>
            </Link>
          </Container>
        </Row>
      </Container>
    </Fade>
  );
};

export default UploadPage;

export async function getStaticProps(ctx) {
  const categories = await db.Category.findAll({
    attributes: ['name'],
    raw: true,
  });

  if (!categories) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      categories: categories.map((category) => category.name),
    },
    revalidate: REVALIDATE_1DAY_S,
  };
}

const uploadVideo = (url, data, handlers, elRef) => {
  return new Promise((resolve, reject) => {
    const { onProgress } = handlers;
    xhr.responseType = 'json';
    xhr.open('POST', url, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        let uploaded = Math.round((e.loaded / e.total) * 100);
        onProgress(uploaded);
      }
    };

    xhr.upload.onloadend = () => {
      if (
        elRef &&
        elRef.current &&
        !elRef.current.classList.contains('list-group-item')
      ) {
        const timer = setTimeout(() => {
          if (elRef && elRef.current) {
            elRef.current.classList.add('list-group-item');
            elRef.current.style.display = 'block';
            elRef.current.textContent =
              'Please wait until the upload process complete';
          }
          clearTimeout(timer);
        }, DELAY_800MS);
      }
    };

    xhr.onabort = () => {
      reject('Upload request aborted');
    };

    xhr.onerror = () => {
      xhr.abort();
      reject(`Sorry! Something went wrong: ${xhr.status} - ${xhr.statusText}`);
    };

    xhr.onloadend = () => {
      if (xhr) {
        onProgress(0);
        resolve(xhr.response);
      }
    };

    xhr.send(data);
  });
};
