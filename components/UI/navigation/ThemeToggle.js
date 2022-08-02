import Toggle from 'react-toggle';

const ThemeToggle = ({ onChange }) => (
  <label className="center">
    <Toggle
      className="day-night-toggle"
      icons={{
        checked: <CheckedIcon />,
        unchecked: <UncheckedIcon />,
      }}
      onChange={onChange}
    />
  </label>
);

export default ThemeToggle;

const CheckedIcon = () => <i className="fas fa-sun text-warning"></i>;

const UncheckedIcon = () => <i className="fas fa-moon text-warning"></i>;
