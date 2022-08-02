const Select = (props) => {
  const { options } = props;
  return (
    <select className="form-select" {...props}>
      <option disabled>{props.default}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
