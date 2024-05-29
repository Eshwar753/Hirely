import React from "react";
import { useDispatch } from "react-redux";
import { useGetProfileQuery, useGetUserDetailsQuery } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/message";

const CandidateProfile = () => {

   const {id: canId} = useParams()

    const {data:userData, isLoading, error } =useGetUserDetailsQuery(canId)

  return<>
   {isLoading? (<Loader />) : error ? ( <Message variant="danger">
          {error?.data?.message || error.error}{" "}
        </Message>) : (
            <div>
                <h3><b>Personal information</b></h3>
                <p><b>First name: </b>{userData.firstName}</p>
                <p><b>Last name: </b>{userData.lastName}</p>
                <p><b>Email: </b>{userData.email}</p>
                <p><b>Mobile number: </b>{userData.mobileNumber}</p>
                <p><b>Address: </b>{userData.address}</p>

                <hr />
                <h3><b>Skills</b></h3>
                <p>{userData.skills}</p>

                <hr/>
                <h3><b>Education</b></h3>
                <p>{userData.education}</p>

                <hr/>
                <h3><b>Experience</b></h3>
                <p>{userData.experience} years</p>

                <hr/>
                <h3><b>Projects</b></h3>
                <p>{userData.projects}</p>

                <hr/>
                <h3><b>Portfolio</b></h3>
                <a href='https://www.google.com/' target="_blank" rel="nofollow"><p>{userData.portfolio}</p></a>


            </div>
        )}
  </>
};

export default CandidateProfile;
