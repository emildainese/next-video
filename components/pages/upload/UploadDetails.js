import { useRef } from 'react';
import AspectRatio from '@/components/container/AspectRatio/AspectRatio';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { ucfirst } from '@/lib/string';
import dynamic from 'next/dynamic';
import Header from '@/components/UI/Header';

const UploadDetails = ({ data, theme }) => {
  const videoRef = useRef();

  const uploadDetails = Object.entries(data).map(
    ([key, value]) =>
      typeof value === 'string' && (
        <ListGroup.Item
          className={`bg-${theme.type} text-${
            theme.type === 'dark' ? 'light' : 'dark'
          }`}
          key={value}
        >
          <strong>{ucfirst(key)}</strong> <span>{value} px</span>
        </ListGroup.Item>
      )
  );

  const eagerTransformation = Object.entries(data.eager[0]).map(
    ([key, value]) =>
      typeof value === 'string' && (
        <ListGroup.Item
          className={`bg-${theme.type} text-${
            theme.type === 'dark' ? 'light' : 'dark'
          }`}
          key={value}
        >
          <strong>{ucfirst(key)}</strong> <span>{value}</span>
        </ListGroup.Item>
      )
  );

  const videoInfo = Object.entries(data.video).map(
    ([key, value]) =>
      typeof value === 'string' && (
        <ListGroup.Item
          className={`bg-${theme.type} text-${
            theme.type === 'dark' ? 'light' : 'dark'
          }`}
          key={value}
        >
          <strong>{ucfirst(key)}</strong> <span>{value}</span>
        </ListGroup.Item>
      )
  );

  return (
    <Container fluid className="p-0">
      <Row className="mb-3">
        <Header text="Upload Details" icon="fa-info-circle" />
        <Col md={8} className="g-0">
          <ListGroup variant="flush" className="p-0">
            {uploadDetails}
          </ListGroup>
        </Col>
        <Col>
          <AspectRatio ratio={data.width / data.height}>
            <video ref={videoRef} controls autoPlay loop>
              <source src={data.secure_url} type={`video/${data.format}`} />
              Your browser does not support video.
            </video>
          </AspectRatio>
        </Col>
      </Row>
      <Row className="mb-3">
        <Header text="Eager Transformations" icon="fa-wrench" />
        <Col className="g-0">{eagerTransformation}</Col>
      </Row>
      <Row className="mb-3">
        <Header text="Video Information" icon="fa-video" />
        <Col className="g-0">{videoInfo}</Col>
      </Row>
    </Container>
  );
};

export default UploadDetails;
