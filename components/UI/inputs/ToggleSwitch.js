import React from 'react';

const ToggleSwitch = ({ label, onChange }) => {
  return (
    <div className="form-check form-switch my-3">
      <input
        type="checkbox"
        className="form-check-input"
        onChange={onChange}
        id="customSwitch"
      />
      <label className="form-check-label" htmlFor="customSwitch">
        {label}
      </label>
    </div>
  );
};

export default ToggleSwitch;
