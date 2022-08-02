const FileInput = ({ label, onChange, name, error, ...props }) => {
  return (
    <div className="form-group mb-3" lang="en">
      <label htmlFor="formFile" className="form-label lead">
        {label}
      </label>
      <input
        type="file"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id="formFile"
        name={name}
        onChange={onChange}
        {...props}
      />
      {error.length > 0 && <small style={{ color: 'red' }}>{error}</small>}
    </div>
  );
};

export default FileInput;
