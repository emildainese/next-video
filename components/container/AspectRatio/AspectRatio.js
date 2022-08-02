import React from 'react';

const CUSTOM_PROPERTY_NAME = '--aspect-ratio';
const DEFAULT_CLASS_NAME = 'react-aspect-ratio-placeholder';

const AspectRatio = (props) => {
  const { children, ratio, style, ...restProps } = props; // eslint-disable-line no-unused-vars

  const newStyle = {
    ...style,
    [CUSTOM_PROPERTY_NAME]: `(${ratio})`,
  };

  return (
    <div {...restProps} style={newStyle}>
      {children}
    </div>
  );
};

AspectRatio.defaultProps = {
  className: DEFAULT_CLASS_NAME,
  ratio: 1,
};

export default AspectRatio;
