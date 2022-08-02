import { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = ({
  imageSrc,
  imageName,
  imageType,
  croppedPreview,
  setCroppedImg,
  setCroppedPreview,
  showGrid,
}) => {
  const imageRef = useRef(null);
  const fileUrl = useRef(null);

  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    height: 90,
    aspect: 16 / 9,
  });

  const onImageLoaded = (image) => {
    imageRef.current = image;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && imageRef.current && crop.width && crop.height) {
      try {
        const { croppedPreview, croppedImage } = await getCroppedImg(
          imageRef.current,
          crop,
          imageName || 'preview.jpeg'
        );
        setCroppedPreview(croppedPreview);
        setCroppedImg(croppedImage);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    if (!image) {
      return;
    }
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error('Canvas is empty'));
          }
          blob.name = imageName;
          blob.lastModified = new Date();
          const croppedImageFile = new File([blob], imageName, {
            type: imageType,
          });
          window.URL.revokeObjectURL(fileUrl.current);
          fileUrl.current = window.URL.createObjectURL(blob);
          resolve({
            croppedPreview: fileUrl.current,
            croppedImage: croppedImageFile,
          });
        },
        imageType,
        1
      );
    });
  };

  return (
    <>
      {imageSrc && (
        <ReactCrop
          src={imageSrc}
          crop={crop}
          ruleOfThirds={showGrid}
          roundBorder={true}
          minHeight={10}
          minHeight={10}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {croppedPreview && (
        <img
          alt="Cropped Preview"
          style={{ objectFit: 'cover', maxWidth: '100%' }}
          src={croppedPreview}
        />
      )}
    </>
  );
};

export default ImageCrop;

function base64ToBlob(base64, mime) {
  mime = mime || 'image/jpeg';
  const sliceSize = 1024;
  const byteChars = window.atob(base64);
  const byteArrays = [];
  const len = byteChars.length;

  for (let offset = 0; offset < len; offset += sliceSize) {
    const slice = byteChars.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
}

// const jpegFile64 = canvas
//   .toDataURL('image/jpeg')
//   .replace(/^data:image\/(png|jpeg);base64,/, '');

// function zoom(e) {
//   const img = e.currentTarget;
//   const offsetX = e.offsetX ? e.offsetX : e.touches[0].pageX;
//   const offsetY = e.offsetY ? e.offsetY : e.touches[0].pageY;
//   const x = (offsetX / img.offsetWidth) * 100;
//   const y = (offsetY / img.offsetHeight) * 100;
//   img.style.transform = `scale(${x}, ${y})`;
// }
