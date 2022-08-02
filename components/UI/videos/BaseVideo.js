import PropTypes from 'prop-types'

const BaseVideo = ({ url, format, height }) => {
  return (
    <div style={{ height: `${height}vh` }}>
      <video
        controls
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background: 'black',
        }}
      >
        <source src={url} type={`video/${format}`} />
        <span className="text-center text-danger">
          Your borouser does not support {format} format
        </span>
      </video>
    </div>
  );
};


BaseVideo.defaultProps = {
  height: '25vh',
}

BaseVideo.propTypes = {
  url: PropTypes.string.isRequired,
}

export default BaseVideo;
