import Overlay from '../Overlay';

const BackgoundVideo = ({ src, withOverlay, opacity, height }) => {

  const video = {
    position: 'fixed',
    top: 0,
    left: 0,
    objectFit: 'cover',
    width: '100%',
    height: `${height}vh`,
    zIndex: 0,
  };

  return (<>
    {withOverlay && <BackgoundOverlay height={height} opacity={opacity} />}
    <video playsInline autoPlay muted loop id="bgvid" style={video}>
      <source src={src} type="video/mp4" />
    </video>
  </>
  );
};

BackgoundVideo.defaultProps = {
  withOverlay: true,
  opacity: 0.5,
  height: '100vh'
};

export default BackgoundVideo;


const BackgoundOverlay = ({ height, opacity }) => {
  return <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: `${height}vh`,
    zIndex: 1,
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0, ${opacity}), rgba(0,0,0,${opacity}))`,
    backgroundSize: 'cover',
  }} />
}