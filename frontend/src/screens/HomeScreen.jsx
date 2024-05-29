import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import JobCard from "../components/JobCard";
import { useGetJobsQuery } from "../slices/jobsApiSlice";
import { useParams, useSearchParams } from "react-router-dom";

const HomeScreen = () => {
  const [searchParams, setSearchParams ] = useSearchParams();
  
  let cityParams = searchParams.get("city") || '';

 const [filterCity, setFilterCity] = useState(cityParams || '');

  const {keyword  } = useParams();

 let { data: jobs, isLoading, error} = useGetJobsQuery({keyword});

  if (cityParams ){
    jobs =  jobs.filter(job => job.jobLocation === cityParams)
  }
  
 
  function addParams(e) {
    e.preventDefault()
    setSearchParams({city: filterCity  })
  
    }


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>
      ) : (
        <>
        <Form onSubmit={addParams}>
        <Row>
      
        <Col lg={3} className="m-4">
        <label><strong>Filter city : </strong> </label>
        <select data-mdb-select-init value={filterCity } onChange={(e)=> setFilterCity(e.target.value)}>
        <option value="">select</option>
        <option value="Banglore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Hydrabad">Hyderabad</option>
        </select>
        
        </Col>
        <Col>
        <Button type='submit' className="m-4 btn btn-dark"  > filter</Button>
        </Col>
        </Row>

        </Form>
        {/* {
          (jobs.length < 1) ? (  <Message>
          {'No data found'}{" "}
        </Message>):( */}
          <Row>
            {jobs.map((job) => (
              <Col
                key={job._id}
                sm={12}
                md={6}
                lg={5}
                xl={4}
                className="py-1 px-3"
              >
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
  
{/*   
          )
          
        } */}

        </>
        
      )}
    </>
  );
};

export default HomeScreen;
