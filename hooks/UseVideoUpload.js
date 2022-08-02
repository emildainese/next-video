import { DELAY_800MS } from '@/constants/time';
import { useState, useRef } from 'react';

const UPLOAD_END_MSG = 'Please wait until the upload process complete';
const UPLAOD_ABORT_REQUEST_MSG = 'Video upload request aborted';
const UPLOAD_ERROR_PREFIX = 'Sorry! Something went wrong: ';
const FALLBACK_ERR_MSG = 'Someting went wrong please try again later';
const keyToSkip = ['videoSrc'];

export const useVideoUpload = (url, data) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({});
  const [abort, setAbort] = useState(false);

  const statusTextRef = useRef(null);

  const uploadVideo = (url) => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.responseType = 'json';
      xhr.open('POST', url, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          let uploaded = Math.round((e.loaded / e.total) * 100);
          setProgress(uploaded);
        }
      };

      xhr.upload.onloadend = () => {
        if (
          statusTextRef &&
          statusTextRef.current &&
          !statusTextRef.current.classList.contains('list-group-item')
        ) {
          const timer = setTimeout(() => {
            if (statusTextRef && statusTextRef.current) {
              statusTextRef.current.classList.add('list-group-item');
              statusTextRef.current.style.display = 'block';
              statusTextRef.current.textContent = UPLOAD_END_MSG;
            }
            clearTimeout(timer);
          }, DELAY_800MS);
        }
      };

      xhr.onabort = () => {
        reject(UPLAOD_ABORT_REQUEST_MSG);
      };

      xhr.onerror = () => {
        xhr.abort();
        reject(`${UPLOAD_ERROR_PREFIX} ${xhr.status} - ${xhr.statusText}`);
      };

      xhr.onloadend = () => {
        if (xhr) {
          setProgress(0);
          resolve(xhr.response);
        }
      };

      xhr.send(data);
    });
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in data) {
      if (!key in keyToSkip) formData.append(key, data[key]);
    }

    try {
      setLoading(true);
      if (statusTextRef && statusTextRef.current) {
        statusTextRef.current.classList.remove('list-group-item');
        statusTextRef.current.style.display = 'none';
      }
      const res = await uploadVideo(url, formData);
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
        setError(FALLBACK_ERR_MSG);
      }
    }
  };

  return {
    fileUploadHandler,
    setAbort,
    statusTextRef,
    loading,
    progress,
    error,
    success,
    abort,
    data,
  };
};
