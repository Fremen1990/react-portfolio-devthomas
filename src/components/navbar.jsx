import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../assets/icons/TS.webp";

import "./navbar.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar
        fixed="top"
        variant="dark"
        expand="md"
        className="animate-navbar nav-theme justify-content-between"
      >
        <div>
          <Navbar.Brand href="#home">
            <img className="logo" src={Logo} alt="" />
          </Navbar.Brand>
        </div>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ">
              <Nav.Link className="nav-link-item" href="#home">
                Home
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#about">
                About
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#skills">
                Skills
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#experience">
                Experience
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#projects">
                Projects
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#education">
                Education
              </Nav.Link>
              <Nav.Link className="nav-link-item" href="#contact">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default MyNavbar;
