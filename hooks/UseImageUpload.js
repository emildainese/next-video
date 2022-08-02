import { useState } from 'react';
import { FILE_SIZE, SUPPORTED_IMG_FORMATS } from '@/constants/file';

export const useImageUpload = (setShowModal = () => {}) => {
  const [fileError, setFileError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [imageName, setImageName] = useState('');

  const changeHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFileError('');
      const file = e.currentTarget.files[0];
      const fileSize = +file.size;
      const fileType = file.type;

      if (!SUPPORTED_IMG_FORMATS.includes(fileType)) {
        return setFileError('Unsupported file format');
      } else if (fileSize > FILE_SIZE) {
        return setFileError(
          `File size too large : ${(fileSize / 1000).toFixed(
            2
          )} kb, keep less than 500 Kb.`
        );
      }

      setImageFile(file);
      setImageName(file.name);

      const reader = new FileReader();
      reader.onabort = () => setFileError('File reading was aborted');
      reader.onerror = () => setFileError('File reading has faild');
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFileError('You can upload only one file.');
    }
  };

  return {
    imageFile,
    fileError,
    imageSrc,
    imageName,
    changeHandler,
  };
};
