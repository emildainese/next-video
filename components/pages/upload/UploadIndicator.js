import dynamic from 'next/dynamic';
import { ProgressBar } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/UI/Loader';
import Fade from '@/components/animations/Fade';
import { UPLOAD_NOTIFICATION_TIME_ENABLE_S } from '@/constants/time';

const Notification = dynamic(
  () => import('@/components/UI/notification/Notification'),
  {
    ssr: false,
  }
);

const UploadIndicator = ({
  loading,
  previewProgress,
  progress,
  show,
  fileName,
  loadPreview,
}) => {
  return (
    <>
      {loading && <Loader />}
      <AnimatePresence>
        {loadPreview && (
          <Fade key="previewProgress">
            <div className="text-center p-2 my-3">
              <ProgressBar
                now={previewProgress}
                striped
                animated
                variant="primary"
              />
            </div>
          </Fade>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {loading && (
          <Fade key="uploadProgress">
            <div className="text-center p-2 my-2">
              <ProgressBar now={progress} striped animated variant="primary" />
            </div>
          </Fade>
        )}
      </AnimatePresence>
      <Notification
        position="top-right"
        close={UPLOAD_NOTIFICATION_TIME_ENABLE_S}
        show={show}
        variant="success"
        message={`Video ${fileName} successfully uploaded!`}
        header="Video uploaded!"
      />
    </>
  );
};

export default UploadIndicator;
