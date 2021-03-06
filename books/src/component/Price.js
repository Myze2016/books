
import React from 'react';
import axios from 'axios';
import { useParams,useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Price() {
	let navigate = useNavigate();
  let { apiID } = useParams();
  const [book, setBook] = useState({"apiID":null,"Title":null,"PublishDate":null,"Authors": []});
  const [Price, setPrice] = useState(0);




 
  const addPrice = (event) => {
    event.preventDefault();

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;

    axios.post('http://localhost/booksclean/public/api/editBookPriceEQS', {Price,apiID}, {headers: headers}).then(
      res => {
        navigate('/home/'+apiID);
       
      }
    )
  };

    

  useEffect(()=>{

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;
    const getBook = async() =>{
      const bookItem = await axios.post('http://localhost/booksclean/public/api/priceEQS', {apiID}, {headers: headers}).then((res) => {
        return res.data;
        }
      );
      
      setPrice(bookItem.Price);
      setBook(bookItem);

      
     
    };

    
    getBook();
   
  },[]);

  
  return(
  
    <div class="p-5">
      <Form onSubmit={addPrice}>
        <Form.Group className="mb-3" >
          <Form.Label>Book Name</Form.Label>
          <Form.Control id="bookTitle" value={book.Name} type="libraryname" placeholder="LibraryName" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Price</Form.Label>
          <Form.Control id="bookPrice"  value={Price} onChange={e => setPrice(e.target.value)} type="number" placeholder="0.00" />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>  
  )
}

export default Price;
