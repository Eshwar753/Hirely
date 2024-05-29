
import { useParams, Link } from "react-router-dom";
import { Button, ListGroup, Row, Col, Card, Badge } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import Loader from "../components/Loader";
import Message from "../components/message";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useApplyForJobMutation, useGetJobDetailsQuery } from "../slices/jobsApiSlice";
import { useSelector } from "react-redux";

const JobsScreen = () => {

  const { id: jobId } = useParams();

  const [applyJob, {isLoading:loadingJobApplication}]= useApplyForJobMutation()

  const{data:job, isLoading, error}= useGetJobDetailsQuery(jobId)
  
  const { userInfo } = useSelector((state) => state.auth);

   
  const applyJobHandler= async(e)=> { 
      try{
        await applyJob({
        id: jobId,
        name: userInfo.name,
        company: job.company,
        title: job.title,
     }).unwrap();
     toast.success("Job applied successfully");
      }catch(err){
        toast.error(err?.data?.message || err.error);
        console.error(err?.data?.message || err.error)
      }
    
    
  };
  
  return (
  
    <div>
      <Link to="/">
        <Button variant="dark">
          <IoArrowBack /> go back
        </Button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : job && (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={3}>Title:</Col>
                  <Col>{job.title}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>Company:</Col>
                  <Col>{job.company}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>Company Description:</Col>
                  <Col>{job.companyDescription}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>Job Description:</Col>
                  <Col>{job.fullDescription}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>Total candidates applied:</Col>
                  <Col>
                    <Badge pill bg="warning">
                      {job.appliedCandidates.length}
                    </Badge>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={3}>Responsibilities:</Col>
                  <Col>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus quasi eligendi possimus delectus natus quos
                    temporibus, provident obcaecati quaerat recusandae odit,
                    perferendis pariatur laboriosam. Ratione ipsam nisi quod
                    necessitatibus pariatur.
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Company:</Col>
                    <Col>
                      <strong>{job.company}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Employment status:</Col>
                    <Col>
                      <strong>{job.employmentStatus}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Job Location:</Col>
                    <Col>
                      <strong>{job.jobLocation}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>skill:</Col>
                    <Col>
                      <strong>{job.skillsRequired}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Experience:</Col>
                    <Col>
                      <strong>{job.experience}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Salary Range:</Col>
                    <Col>
                      <strong>$100k-$120k</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        variant="dark"
                        text="light"
                        className="btn-block"
                        size="lg"
                        type="button"
                        disabled={loadingJobApplication|| job.appliedCandidates.find((c)=> c.user === userInfo._id ) || userInfo.isRecruiter}
                        onClick={(e)=> applyJobHandler(e)}
                      >
                        {job.appliedCandidates.find((c)=> c.user === userInfo._id )? (<strong>Job Applied</strong>):( <><strong>Apply</strong> <IoIosAddCircle /></>)  }
                        
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        {loadingJobApplication && <Loader />}
        </Row>
      )}
    </div>
  );
};

export default JobsScreen;
