import AspectRatio from '@/components/container/AspectRatio/AspectRatio';

const VideoPreview = ({ ratio, style, videoTagRef, videoSrcRef }) => {
  return (
    <AspectRatio ratio={ratio} style={{ ...style }}>
      <video controls ref={videoTagRef}>
        <source id="video-source" src="splashVideo" ref={videoSrcRef} />
        Your browser does not support video.
      </video>
    </AspectRatio>
  );
};

export default VideoPreview;
