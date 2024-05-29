import React, { useState } from "react";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";


const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);



  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      console.log("from search" + keyword)
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  

  return (

      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Search..."
          className="mr-sm-2 ml-sm-5"
        >
        </Form.Control>
        <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        <IoIosSearch />
      </Button>


         

    {/* */}

    {/* <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} /> */}

      </Form>

 

  );
};

export default SearchBox;


   