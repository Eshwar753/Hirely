import React from "react";
import { Button, Table } from "react-bootstrap";
import { IoOpenOutline } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";

import { useParams } from "react-router-dom";
import { useGetJobDetailsQuery } from "../slices/jobsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/message";

const AppliedCandidatesScreen = () => {

   const{id: jobId} = useParams()
 
   const{data:job, isLoading, error}= useGetJobDetailsQuery(jobId)

  return (<>
    {
        isLoading ? (<Loader />) :error? (<Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
            ) :  (
    <Table>
    <thead>
      <tr>
        <th>Candidate ID</th>
        <th>Name</th>
        <th>Applied date</th>

      </tr>
    </thead>
    <tbody>
    {
        job.appliedCandidates.length === 0 ? (<Message >
              No applications found
            </Message>
            ) :(<>
                {job.appliedCandidates.map((candidate) =>(
       <tr key={candidate._id}>
       <td>{candidate.user}</td> 
       <td>{candidate.name}</td>
       <td>{candidate.createdAt.substring(0,10)}</td>
       <LinkContainer to={`/candidate/${candidate.user}`}>
       <td><Button variant='light' className='btn-sm'
                      ><IoOpenOutline /></Button></td>
       </LinkContainer>
       </tr>
       
    ))}
   

    </>)
    }
    
    </tbody>
   </Table>)
    }
  </>
  )};

export default AppliedCandidatesScreen;
