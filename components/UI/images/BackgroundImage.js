import React from 'react';

const BackgroundImage = ({
  children,
  url,
  rgbaFrom = 'rgba(0, 0, 0, 0.3)',
  rgbaTo = 'rgba(0, 0, 0, 0.3)',
  style,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to bottom, ${rgbaFrom}, ${rgbaTo}), url(${url})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
