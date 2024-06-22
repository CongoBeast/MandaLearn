import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FaEnvelope, FaTwitter, FaLinkedin } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Body className="text-center">
              <Image src="https://github.com/CongoBeast/FPL-Points/blob/main/methembe.jpg?raw=true" roundedCircle className="mb-4" style={{ width: '150px', height: '150px' }}/>
              <Card.Title>Bulawayo's Data Analyst</Card.Title>
              <Card.Text>
                Methembe is a machine learning engineer and a data professional who is interested
                in learning more languages and using AI to build cool stuff and make the world a more interesting place.
              </Card.Text>
              <div className="social-icons">
                <a href="mailto:thomastshuma43@gmail.com"><FaEnvelope size={30} /></a>
                <a href="https://x.com/MethembeThomas" target="_blank" rel="noopener noreferrer"><FaTwitter size={30} /></a>
                <a href="https://www.linkedin.com/in/methembe-data-science-tshuma-038966199/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={30} /></a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
