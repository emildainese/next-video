import React from 'react';
import AspectRatio from '@/components/container/AspectRatio/AspectRatio';

const ARVideo = ({ videoRef, url, format, width, height, style }) => {
  let ratio = null;

  if (height !== 0) {
    ratio = width / height;
  } else {
    ratio = 4 / 3;
  }

  return (
    <AspectRatio ratio={ratio} style={{ ...style }}>
      <video ref={videoRef} controls autoPlay>
        <source src={url} type={`video/${format}`} />
        Your browser does not support video.
      </video>
    </AspectRatio>
  );
};

export default ARVideo;
