import { Container } from 'react-bootstrap';
import Pulse from '../animations/Pulse';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="p-2 mt-3 w-100 position-absolute" style={{ left: 0, bottom: 0 }} >
      <Container
        className="p-0 d-flex align-items-center justify-content-center"
        fluid
      >
        <span
          className="me-2 lead"
          style={{
            fontSize: '1.5rem',
            fontWeight: 350,
            color: `${theme.fontColor}`,
          }}
        >
          Made width
        </span>
        <Pulse>
          <i className="fas fa-heart fa-3x" style={{ color: 'red' }}></i>
        </Pulse>
        <span
          className="ms-2 lead"
          style={{
            fontSize: '1.5rem',
            fontWeight: 350,
            color: `${theme.fontColor}`,
          }}
        >
          and Next.js
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
