'use client';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

  return (
    <Navbar expand="lg" className="nav-header">
      <Container>
        <Navbar.Brand href="profiles" id="welcome">Welcome, User</Navbar.Brand>
        <Nav fill variant="tabs" activeKey={pathname.slice(1)} className='nav-tabs'>
          <Button variant="primary" type="submit" href='/'>
              Logout
          </Button>
          <Nav.Item>
            <Nav.Link href="profiles">Profiles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="floorplan">FloorPlan</Nav.Link>
          </Nav.Item>  
          <Nav.Item>
            <Nav.Link href="schedules">View Schedules</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>    
  );
}

export default Header;
