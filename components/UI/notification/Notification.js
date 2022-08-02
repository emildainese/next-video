import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Toast } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '@/context/ThemeContext';
import { useSession } from 'next-auth/client';
import { NOTIFICATION_TIME_UPDATE_MS } from '@/constants/time';

const Message = ({ closeToast, variant, header, body }) => {
  const [elapsed, setElapsed] = useState();
  const { theme } = useTheme();
  const start = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = (Date.now() - start.current) / 1000;
      setElapsed(seconds.toFixed(0));
    }, NOTIFICATION_TIME_UPDATE_MS);
    return () => clearInterval(interval);
  }, [elapsed]);

  return (
    <Toast
      style={{ width: '100%', height: '100%' }}
      className="border-0"
      onClose={closeToast}
    >
      <Toast.Header className={`bg-${theme.type} p-3 border-0`}>
        <strong className={`me-auto text-${variant}`}>{header}</strong>
        <small>
          {!elapsed
            ? `just now`
            : elapsed >= 60
            ? `${(elapsed / 60).toFixed(0)} min ago`
            : `${elapsed} secs ago`}
        </small>
        <span className="mx-3">
          <i className="fas fa-times text-danger"></i>
        </span>
      </Toast.Header>
      <Toast.Body
        className={` bg-${theme.type} text-${variant} p-3 border-top border-${variant}`}
      >
        {body}
      </Toast.Body>
    </Toast>
  );
};

const Notification = ({
  show,
  message,
  variant,
  header,
  position,
  close,
  limit = 1,
}) => {
  const { theme } = useTheme();
  const [session] = useSession();

  const toastId = useRef(null);

  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast(
        <Message variant={variant} body={message} header={header} />,
        {
          position: setPosition(position, toast),
          autoClose: close * 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          className: `bg-${theme.type}`,
          progressClassName: 'progress',
          onClose: () => {},
          onOpen: () => {},
        }
      );
    }
  };

  useEffect(() => {
    toast.dismiss();
  }, [session]);

  return (
    <div style={{ color: 'transparent' }}>
      {show && notify()}
      <ToastContainer />
    </div>
  );
};

export default React.memo(Notification);

const setPosition = (position, toast) => {
  switch (position) {
    case 'top-left':
      return toast.POSITION.TOP_LEFT;
    case 'top-right':
      return toast.POSITION.TOP_RIGHT;
    case 'top-center':
      return toast.POSITION.TOP_CENTER;
    case 'bottom-left':
      return toast.POSITION.BOTTOM_LEFT;
    case 'bottom-right':
      return toast.POSITION.BOTTOM_RIGHT;
    case 'bottom-center':
      return toast.POSITION.BOTTOM_CENTER;
    default:
      return toast.POSITION.TOP_RIGHT;
  }
};
