import { ProgressBar } from 'react-bootstrap';

const Progress = ({ value }) => {
  return (
    <div className="text-center my-3">
      <ProgressBar now={value} striped variant="primary" />
    </div>
  );
};

ProgressBar.defaultProps = {
  value: 0,
};

export default Progress;
