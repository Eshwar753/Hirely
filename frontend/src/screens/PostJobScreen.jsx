import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Row, Col, Tab, Tabs } from "react-bootstrap";
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateJobMutation } from "../slices/jobsApiSlice";

const PostJobScreen = () => {
  const [key, setKey] = useState("Job info");

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [salaryFrom, setSalaryFrom] = useState();
  const [salaryTo, setSalaryTo] = useState();
  const [minimumQualification, setMinimumQualification ] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [smallDescription, setSmallDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [email, setEmail] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createJob, { isLoading }] = useCreateJobMutation();

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await createJob({ title,department,experience,minimumQualification,salaryFrom,
      salaryTo,skillsRequired,smallDescription,fullDescription,company, phoneNumber,companyDescription,
    email,jobLocation,employmentStatus}).unwrap();
      toast.success("Job successfully created.");

      setTimeout(()=>{
           navigate('/');
      },1000)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } 


  }

  return (
    <>
      
      <Form onSubmit={submitHandler}>
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Job info" title=<strong>Job Info</strong>>
            <Row>
              <Col>
                <Form.Group className="my-2" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    placeholder="Job Title"
                    border="danger"
                    style={{ width: "20rem" }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="name"
                    required
                    placeholder="Enter department name"
                    border="danger"
                    style={{ width: "20rem" }}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="experience">
                  <Form.Label>Experience required</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter required experience"
                    border="danger"
                    style={{ width: "28rem" }}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="salaryFrom">
                  <Form.Label>Salary from</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Enter salary from"
                    border="danger"
                    style={{ width: "28rem" }}
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="salaryTo">
                  <Form.Label>Salary to</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    placeholder="Enter salary to"
                    border="danger"
                    style={{ width: "28rem" }}
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="skillsRequired">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="List skills required"
                    style={{ width: "28rem" }}
                    value={skillsRequired}
                    onChange={(e) => setSkillsRequired(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              
              <Col>
                <Form.Group className="my-2" controlId="employmentStatus">
                  <Form.Label>Employment status</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="State employment status ex:fulltime..."
                    style={{ width: "28rem" }}
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              
              <Col>
                <Form.Group className="my-2" controlId="jobLocation">
                  <Form.Label>Job location</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter job location"
                    style={{ width: "28rem" }}
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="minimumQualification">
                  <Form.Label>Minimum Qualification</Form.Label>
                  <Form.Select 
                  style={{ width: "28rem" }}
                  aria-label="Default select example" onChange={(e) => setMinimumQualification(e.target.value)}>
                    <option>Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Post-Graduation">Post-Graduation</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Diploma">Diploma</option>
                    <option value="School">School</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="smallDescription">
                  <Form.Label>Small description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    required
                    placeholder="Enter small description"
                    style={{ width: "68rem" }}
                    value={smallDescription}
                    onChange={(e) => setSmallDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="my-2" controlId="fullDescription">
                  <Form.Label>Full description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    placeholder="Enter full description"
                    style={{ width: "68rem" }}
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button
              type="button"
              variant="dark"
              onClick={() => setKey("Company info")}
            >
              Next
            </Button>
          </Tab>

          <Tab eventKey="Company info" title=<strong>Company Info</strong>>
            <Row>
              <Col>
                <Form.Group className="my-2" controlId="company">
                  <Form.Label>Company name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter company name"
                    style={{ width: "28rem" }}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-2" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter email"
                    style={{ width: "28rem" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-2" controlId="phoneNumber">
                  <Form.Label>mobile number</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter contact number"
                    border="danger"
                    style={{ width: "28rem" }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="my-2" controlId="company description">
                  <Form.Label>Company description</Form.Label>
                  <Form.Control
                    as="textarea"
                    required
                    rows={3}
                    placeholder="Enter company description"
                    style={{ width: "68rem" }}
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="dark">
              Post Job
            </Button>
          </Tab>
        </Tabs>
      </Form>
      
    </>
  );
};

export default PostJobScreen;
