import { Spinner } from 'react-bootstrap';

const Loader = ({ animation = 'grow' }) => {
  return (
    <div className="text-center text-primary mb-2">
      <Spinner animation={animation} varinat="primary" />
    </div>
  );
};

export default Loader;
