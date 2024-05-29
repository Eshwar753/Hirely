import React from "react";
import { Button,Table, Col, Row, Container, Modal } from "react-bootstrap";

const Model = (props) => {
    return (
        <Modal show={props.show} close={props.onHide} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Using Grid in Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Container>
              <Row>
                <Col xs={12} md={8}>
                  .col-xs-12 .col-md-8
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
              </Row>
    
              <Row>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
                <Col xs={6} md={4}>
                  .col-xs-6 .col-md-4
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark"
                          text="light"
                          className="btn-block"
                          size="lg"
                          type="button" 
                          onClick={props.onHide}>
                          Close
                          </Button>
          </Modal.Footer>
        </Modal>
      );
};

export default Model;
