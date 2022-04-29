
import React from 'react';
import axios from 'axios';
import {	useParams,useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function LibraryEdit() {
	let navigate = useNavigate();
  let { LibraryID } = useParams();
  const [Title, setTitle] = useState();
  const [Description, setDescription] = useState();

 
  const editLibrary = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost/booksclean/public/editLibraryEQS', {LibraryID,Title,Description}).then(
      res => {
        navigate('/library');
      }
    )
  };

    

  useEffect(()=>{
    
    const getLibrary = async() =>{
      
      const result= await axios.post('http://localhost/booksclean/public/getLibraryItemEQS', {LibraryID}).then((res) => {
        var result = res.data;
      
       
       
        setTitle(result.Title);
        setDescription(result.Description);
        //return result;
      
      }
      );
    };
   
    getLibrary();
   
  },[]);
  
  return(
    <div class="pl-5 pr-5 pt-3">
      <Form onSubmit={editLibrary}>
      <div>
        <Form.Group className="mb-3" >
          <Form.Label>LibraryName</Form.Label>
          <Form.Control id="Library-Title" value={Title} onChange={e => setTitle(e.target.value)} placeholder="Library Name" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Descripton</Form.Label>
          <Form.Control id="librarydescription" value={Description} onChange={e => setDescription(e.target.value)} placeholder="Descripton" />
        </Form.Group>
      </div>
     
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>  
  )
}

export default LibraryEdit;
