import React from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MenuAdmin() {
    return (
        <>
        <Router>
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Menu Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '175px' }} navbarScroll>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <NavDropdown title="Account" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
        
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </Router>
        </>
    )  
}

export default MenuAdmin;