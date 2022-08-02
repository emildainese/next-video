import { useTheme } from '@/context/ThemeContext';
import React from 'react';

const Jumbotron = ({ title, body, children }) => {
  const { theme } = useTheme();
  return (
    <div className={`p-3 mb-4 bg-${theme.type} rounded-3`}>
      <div className="container-fluid py-3">
        <h1 className="display-5 fw-bold">{title}</h1>
        <p className="col-md-8 fs-4">{body}</p>
        {children}
      </div>
    </div>
  );
};

Jumbotron.defaultProps = {
  title: 'Custom jumbotron',
  body: `Using a series of utilities, you can create this jumbotron, just like
  the one in previous versions of Bootstrap. Check out the examples
  below for how you can remix and restyle it to your liking.`,
};

export default Jumbotron;
