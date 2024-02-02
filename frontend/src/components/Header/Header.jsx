import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  console.log(userInfo)
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <Navbar
      expand="lg"
      className="navbar bg-body-tertiary navbar-expand-lg bg-dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">SnapNotes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <nav className="m-auto">
            <Form>
              <FormControl
                type="text"
                placeholder="Search..."
                className="mr-sm-2"
              />
            </Form>
          </nav>
          <Nav>
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <NavDropdown
              title={userInfo ? userInfo.name : "user"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
