import React from 'react';

const Overlay = ({ closeSidebar, opacity, zIndex, height }) => {
  return (
    <div
      id="overlay"
      onClick={closeSidebar}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100%',
        minWidth: '100%',
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        zIndex: zIndex,
      }}
    />
  );
};

Overlay.defaultProps = {
  opacity: 0.6,
  zIndex: 999,
};

export default Overlay;
