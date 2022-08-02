import { useTheme } from '@/context/ThemeContext';
import { Modal, Button } from 'react-bootstrap';

const setVariant = (variant) => {
  return variant && variant === 'danger'
    ? '#dc3545'
    : variant === 'success'
    ? '#198754'
    : variant === 'warning'
    ? '#ffc107'
    : '';
};

const BaseModal = (props) => {
  const { theme } = useTheme();

  return (
    <Modal {...props} centered style={{ ...props.style }}>
      <Modal.Header className={`bg-${theme.type}`}>
        <Modal.Title
          style={{
            color: setVariant(props.variant),
          }}
        >
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`bg-${theme.type}`}
        style={{
          color: setVariant(props.variant),
        }}
      >
        {props.children}
      </Modal.Body>
      <Modal.Footer className={`bg-${theme.type}`}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

BaseModal.defaultProps = {
  size: 'md',
};

export default BaseModal;
