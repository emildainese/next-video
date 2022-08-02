import { Button } from 'react-bootstrap';

const FileUpload = ({
  fileName,
  fileUploadHandler,
  fileChangeHandler,
  accept,
  loading,
}) => {
  return (
    <Button
      className="w-100"
      variant="primary"
      type="button"
      onClick={fileName ? fileUploadHandler : () => {}}
      disabled={loading}
    >
      {fileName ? (
        <label>
          <i className="fas fa-upload ml-3"></i> Upload {fileName}
        </label>
      ) : (
        <label htmlFor="file-upload" className="w-100">
          <i className="fas fa-video"></i> Choose a Video
        </label>
      )}
      {!fileName && (
        <input
          id="file-upload"
          type="file"
          className="position-absolute"
          style={{ opacity: 0, zIndex: -1 }}
          onChange={fileChangeHandler}
          accept={`${accept ? accept : 'image'}/*`}
        />
      )}
    </Button>
  );
};

export default FileUpload;
