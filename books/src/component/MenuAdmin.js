import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeFunction from './HomeFunction';
import LibraryAdd from './LibraryAdd';
import LibraryEdit from './LibraryEdit';
import Price from './Price';
import Cart from './Cart';
import Pay from './Pay';
import Logout from './Logout';
import Report from './Report';
import Library from "./Library";
import Profile from "./Profile";
import BookAdmin from './BookAdmin';

function MenuAdmin() {
    const [profile, setProfile] = useState({email: 'xxx'});

    useEffect(()=>{
		
		
		const getProfile = async() =>{
		  const UserID = sessionStorage.getItem('userID');
		 
		  const result= await axios.post('http://localhost/booksapi/public/profileEQS', {UserID}).then((res) => {
				console.log(res.data);
               
		  		return res.data; 
			}
		  );
		  
	
         
		  setProfile(result);
		};

		
		getProfile();
	},[]);

    return (
        <>
        <Router>
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Books</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '175px' }} navbarScroll>
                    <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/report">Reports</Nav.Link>
                       
                        <NavDropdown title="Account" id="navbarScrollingDropdown">
                            <NavDropdown.Item >{profile.email}</NavDropdown.Item>
                            <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/Logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
        
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <Routes>
                <Route path="/home"  element={<HomeFunction />} >
                </Route>
                <Route path="/profile"  element={<Profile />} >
                </Route>
       
       

                <Route path={`/home/:apiID`} element={<BookAdmin />}>
                </Route>
        
                <Route path={`/report`} element={<Report />}>
                </Route>    

                <Route path={`/cart/pay/:CartID`} element={<Pay />}>
                </Route>
                
                <Route path={`/library`} element={<Library />}>
                </Route>

                <Route path={`/cart`} element={<Cart />}>
                </Route>



                <Route path={`/library/add`} element={<LibraryAdd />}>
                </Route>
                
                <Route path={`/library/edit/:LibraryID`} element={<LibraryEdit />}>
                </Route>

                <Route path={`/home/product/price/:apiID`} element={<Price />}>
                </Route>

                <Route path={`/home/price/:apiID`} element={<Price />}>
                </Route>

                <Route path={`/logout`} element={<Logout />}>
                </Route>
            </Routes> 
        </Router>
        </>
    )  

}

export default MenuAdmin;