import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LibraryAdd() {
	let navigate = useNavigate();
  const [Title, setTitle] = useState();
  const [Description, setDescription] = useState();

  const addLibrary = (event) => {
    event.preventDefault();
    const UserID = sessionStorage.getItem('userID');

    axios.post('http://localhost/booksclean/public/addLibraryEQS', {Title,Description,UserID}).then(
      res => {
        navigate('/library');
      }
      )
    };
  
  return(
    <div className="pl-5 pr-5 pt-3">
      <Form onSubmit={addLibrary}>
        <Form.Group className="mb-3">
          <Form.Label>Library Name</Form.Label>
          <Form.Control onChange={e => setTitle(e.target.value)} placeholder="Library Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descripton</Form.Label>
          <Form.Control onChange={e => setDescription(e.target.value)} placeholder="Descripton" />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>  
  )
}

export default LibraryAdd;
