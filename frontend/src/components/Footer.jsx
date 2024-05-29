import React from "react";
import {Container, Row, Col} from "react-bootstrap";

const Footer = () => {

    const year= new Date().getFullYear();

  return <>
  <footer className="py-5">
    <Container>
        <Row>
            <Col className="text-center py-3">
                <p>
                    Hirely &copy; {year}
                </p>
            </Col>
        </Row>
    </Container>
  </footer>
  </>;
};

export default Footer;
