import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function AppBar() {
    const {currentUser} = useAuth();
  return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand as={Link} to="/dashboard">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            {currentUser && <Nav.Link as={Link} to="/projects">Projects</Nav.Link>}
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    )
}
