import { Form } from 'react-bootstrap';
import { ErrorMessage } from 'formik';

const Input = ({
  type,
  className,
  values,
  label,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <Form.Group className={className}>
      <Form.Label className="lead">{label}</Form.Label>
      <Form.Control
        type={type}
        className={`${
          errors[field.name] && touched[field.name] ? 'is-invalid' : ''
        }`}
        {...field}
        {...props}
        value={field.value || ''}
      />
      <ErrorMessage
        name={field.name}
        component="div"
        className="invalid-feedback"
        style={{ color: 'red' }}
      />
    </Form.Group>
  );
};

export default Input;
