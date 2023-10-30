'use client';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar expand="lg" id="nav-header">
          <Container>
            <Navbar.Brand href="profiles" id="welcome">Welcome, User</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav variant="tabs" className="ms-auto">
              <Nav.Link href="profiles">Profiles</Nav.Link>
              <Nav.Link href="floorplan">FloorPlan</Nav.Link>
              <Nav.Link href="schedules">View Schedules</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      );
}

export default Header;
