import ProgressStatus from '@/components/animations/Glowing';
import { ListGroup } from 'react-bootstrap';

const PreviewDetails = ({
  theme,
  fileName,
  fileSize,
  fileType,
  loading,
  progress,
  statusTextRef,
}) => {
  return (
    <ListGroup variant="flush" className="my-3 shadow">
      <ListGroup.Item
        className={`bg-${theme.type} text-${
          theme.type === 'dark' ? 'light' : 'dark'
        }`}
      >
        <strong>File Name: </strong> <span>{fileName}</span>
      </ListGroup.Item>
      <ListGroup.Item
        className={`bg-${theme.type} text-${
          theme.type === 'dark' ? 'light' : 'dark'
        }`}
      >
        <strong>File Size: </strong> <span>{fileSize}</span>
      </ListGroup.Item>
      <ListGroup.Item
        className={`bg-${theme.type} text-${
          theme.type === 'dark' ? 'light' : 'dark'
        }`}
      >
        <strong>File Type: </strong> <span>{fileType}</span>
      </ListGroup.Item>
      {loading && (
        <>
          <ListGroup.Item
            className={`bg-${theme.type} text-${
              theme.type === 'dark' ? 'light' : 'dark'
            }`}
          ></ListGroup.Item>
          <ProgressStatus variant="warning" statusTextRef={statusTextRef} />
        </>
      )}
    </ListGroup>
  );
};

export default PreviewDetails;
