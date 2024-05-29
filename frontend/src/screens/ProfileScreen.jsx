import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Tab,
  Tabs,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import {
  setCredentials,
} from "../slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [key, setKey] = useState("personal info");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile] = useProfileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setEmail(userInfo.email);
    setNumber(userInfo.number);
    setPortfolio(userInfo.portfolio);
    setAbout(userInfo.about);
    setAddress(userInfo.address);
    setEducation(userInfo.education);
    setSkills(userInfo.skills);
    setExperience(userInfo.experience);
    setProjects(userInfo.projects);
    setCompany(userInfo.company);
    setDesignation(userInfo.designation);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        firstName,
        lastName,
        email,
        number,
        about,
        address,
        portfolio,
        education,
        skills,
        experience,
        projects,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
        {userInfo.isRecruiter ? (
          <>
            <h2>User Profile</h2>
            <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      placeholder="Enter first Name"
                      style={{ width: "28rem" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="my-2" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      placeholder="Enter last Name"
                      style={{ width: "28rem" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  style={{ width: "28rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="mobile">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Phone Number"
                      value={number}
                      style={{ width: "28rem" }}
                      onChange={(e) => setNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

              <Form.Group className="my-2" controlId="company">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Company Name"
                  value={company}
                  style={{ width: "28rem" }}
                  onChange={(e) => setCompany(e.target.value)}
                ></Form.Control>
              </Form.Group>
              
              <Form.Group className="my-2" controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Your designation"
                  value={designation}
                  style={{ width: "28rem" }}
                  onChange={(e) => setDesignation(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="dark">
                Update
              </Button>
            </Form>
          </>
        ) : (
          <>
          <Form onSubmit={submitHandler}>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="personal info" title=<strong>Personal Info</strong>>
              <Row>
                <Col>
                  <Form.Group className="my-2" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      placeholder="Enter first Name"
                      border="danger"
                      style={{ width: "20rem" }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="name"
                      required
                      placeholder="Enter last name"
                      border="danger"
                      style={{ width: "20rem" }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter email address"
                      border="danger"
                      style={{ width: "28rem" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="mobile">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Phone Number"
                      border="danger"
                      style={{ width: "28rem" }}
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="portfolio">
                    <Form.Label>Portfolio</Form.Label>
                    <Form.Control
                      type="link"
                      required
                      placeholder="Add portfolio link"
                      border="danger"
                      style={{ width: "28rem" }}
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="about">
                    <Form.Label>About</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      placeholder="Add something about you"
                      style={{ width: "68rem" }}
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="my-2" controlId="Address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      placeholder="Add your address"
                      style={{ width: "68rem" }}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="button" variant="dark" onClick={()=> (setKey("Skills and Education"))}>
                Next
              </Button>
            </Tab>

            <Tab
              eventKey="Skills and Education"
              title=<strong>Skills and Education</strong>
            >
              <Row>
                <Col>
                  <Form.Group className="my-2" controlId="education">
                    <Form.Label>Education</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={3}
                      placeholder="List your education details"
                      style={{ width: "68rem" }}
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="my-2" controlId="skills">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={3}
                      placeholder="List your skills"
                      style={{ width: "68rem" }}
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="my-2" controlId="experience">
                    <Form.Label>Experiences</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={3}
                      placeholder="list Your Expeiences"
                      style={{ width: "68rem" }}
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="my-2" controlId="projects">
                    <Form.Label>Projects</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={3}
                      placeholder="List your projects"
                      style={{ width: "68rem" }}
                      value={projects}
                      onChange={(e) => setProjects(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
          <Button type="submit" variant="dark">
                Update
              </Button>
            </Tab>
          </Tabs>
      </Form>
      </>
        )
  }
  </>
  );
};

export default ProfileScreen;
