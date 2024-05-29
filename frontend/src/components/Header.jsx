import React from "react";
import {Navbar, Nav,Container, NavDropdown} from "react-bootstrap";
import {FaFilter, FaUser} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import SearchBox from "./SearchBox";


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {userInfo} = useSelector((state)=>state.auth);

  const [logoutApiCall]= useLogoutMutation();
  
const logoutHandler = async() =>{
  try{
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate("/login");
  }catch(err){
    console.log(err);
  }
}

  return (
  <header className="pb-3">
   <Navbar bg='dark' variant="dark" expand='lg' collapseOnSelect>
   <Container>
          <Navbar.Brand href='/'><h1>Hirely</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            <div className="justify-content-around">
               <SearchBox />
            </div>
                    {
                      userInfo ? (
                        <NavDropdown title={userInfo.name} id="username" bg='dark' variant='dark'>
                          <LinkContainer to='/profile'>
                             <NavDropdown.Item >Profile</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                  
                      ): (
                        
                    <LinkContainer to='/login'>
                    <Nav.Link ><FaUser/> Sign In</Nav.Link>
                    </LinkContainer>
                      )
                    }
                    {userInfo && userInfo.isRecruiter &&(
                      <NavDropdown title='Recruiter' id="menu" >
                          <LinkContainer to='/recruiter/postjobs'>
                             <NavDropdown.Item >Post Jobs</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to={`/recruiter/posted/${userInfo._id}`}>
                             <NavDropdown.Item >Posted</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                    )}
                    {userInfo && !userInfo.isRecruiter && (
                          <LinkContainer to='profile/applied-jobs'>
                             <Nav.Link>Applied Jobs</Nav.Link>
                          </LinkContainer>
                    )
                    } 
                        
            </Nav>
          </Navbar.Collapse>
        </Container>
   </Navbar>
  </header>
  )
};

export default Header;
