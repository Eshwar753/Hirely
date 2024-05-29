import React from "react";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/message";
import { useGetProfileQuery } from "../slices/usersApiSlice";
import { setCredentials } from '../slices/authSlice';



const AppliedJobScreen = () => {
  // const{id: userId} = useParams()

  const dispatch = useDispatch();

  // const {data:jobsList, isLoading, error}= useGetPostedJobsQuery(userId);
  const {data, isLoading, error } =useGetProfileQuery()

  
  return (<>
  {
    isLoading ? (<Loader />) :error? (<Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
        ) : dispatch(setCredentials({ ...data })) && (
          <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Posted on</th>
        </tr>
      </thead>
      <tbody>
      {data.appliedJobs.map((job) =>(
         <tr key={job._id}>
         <td>{job.title}</td>
         <td>{job.company}</td>
         <td>{job.createdAt.substring(0,10)}</td>
         {/* <td>
         <LinkContainer to={`/recruiter/editjob/${job._id}`}>
                    <Button variant='light' className='btn-sm'>
                    <CiEdit />
                    </Button>
        </LinkContainer>

         </td> */}
         

         </tr>
      ))}
      </tbody>
     </Table>
        )
 
  }
    
  </>)
};

export default AppliedJobScreen;
