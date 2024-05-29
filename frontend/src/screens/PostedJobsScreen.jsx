import React from "react";
import { useParams } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { Button,Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import { CiEdit } from "react-icons/ci";
import {useGetPostedJobsQuery } from "../slices/jobsApiSlice";
import { CiBoxList } from "react-icons/ci";

const PostedJobsScreen = () => {

  const{id: userId} = useParams()

  const {data:jobsList, isLoading, error}= useGetPostedJobsQuery(userId);

  return (<>
  {
    isLoading ? (<Loader />) :error? (<Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
        ) :  (
          <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Posted on</th>
          <th>Total applicants</th>
          <th>Actions </th>
        </tr>
      </thead>
      <tbody>
      {jobsList.map((job) =>(
         <tr key={job._id}>
         <td>{job.title}</td>
         <td>{job.company}</td>
         <td>{job.createdAt.substring(0,10)}</td>
         <td>{job.appliedCandidates.length}</td>
         <td>
         <LinkContainer to={`/recruiter/editjob/${job._id}`}>
                    <Button variant='light' className='btn-sm' data-toggle="tooltip" data-placement="top" title="Edit job post">
                    <CiEdit />
                    </Button>
        </LinkContainer>
        <LinkContainer to={`/recruiter/appliedcandidates/${job._id}`}>
                    <Button variant='light' className='btn-sm' data-toggle="tooltip" data-placement="top" title="Applied candidates" >
                      <CiBoxList />
                    </Button>
        </LinkContainer>            
         </td>
         </tr>
      ))}
      </tbody>
     </Table>
        )
 
  }
    
  </>)
};

export default PostedJobsScreen;
