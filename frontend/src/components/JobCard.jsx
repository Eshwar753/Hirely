import React from "react";
import { Button, Card ,Row, Col, Badge} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const JobCard = ( { job }) => {
  return <div>
    <Card style={{ width: '22rem'}} className='my-3 p-3 rounded shadow p-3 mb-5 bg-white rounded'>

      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
        <Card.Text>
          {job.smallDescription}
        </Card.Text>
        <Row>
            <Col>
            <LinkContainer to={`/jobs/${job._id}`} >
                <Card.Link><Button variant="dark">view</Button></Card.Link>
            </LinkContainer>
            </Col>
            <Col>
               <Badge bg="warning" text="dark" className="my-3">posted on: {job.createdAt.substring(0,10)}</Badge>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  </div>;
};

export default JobCard;
