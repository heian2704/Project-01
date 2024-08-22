import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css'; // Import the custom CSS file

const NavigationBar = () => {
  const location = useLocation(); // Hook to get the current route

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        Car Analytics
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto nav-links">
          <Nav.Link
            as={Link}
            to="/"
            className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/highlighted"
            className={`nav-link-custom ${location.pathname === '/highlighted' ? 'active' : ''}`}
          >
            Highlighted Cars
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
