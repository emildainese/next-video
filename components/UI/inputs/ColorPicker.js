import { Button } from 'react-bootstrap';

const ColorPicker = ({ value, onChange }) => {
  return (
    <Button
      className="w-100 p-0"
      variant="primary"
      type="button"
      title="Choose a background color"
    >
      <label htmlFor="backgroundColor" className="w-100 p-2">
        <i className="fas fa-palette me-1"></i> Open Picker
      </label>
      <input
        style={{ opacity: 0, zIndex: -1 }}
        type="color"
        name="background"
        id="backgroundColor"
        className="position-absolute form-control form-control-color"
        value={value}
        onChange={onChange}
      />
    </Button>
  );
};

export default ColorPicker;
