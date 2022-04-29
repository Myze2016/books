
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	useParams,useNavigate,Link
} from "react-router-dom";
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';


function Book() {
  let { apiID } = useParams();
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState();
  const [libraryList, setLibraryList] = useState([{}]);
  const [book, setBook] = useState({"apiID":null,"Title":null,"PublishDate":null,"Authors": []});
  

  

  const addPrice = event => {
    const apiID = book.apiID;
    const Title = book.Title;
    const PublishDate = book.PublishDate;
    axios.post('http://localhost/booksclean/public/addBookEQS', {apiID,Title,PublishDate}).then(
      res => {
          navigate('/home/price/'+apiID);
        }
      )
  }


  useEffect(()=>{
    const getBook = async() =>{
      
      const book = await axios.post('http://localhost/booksclean/public/book', {apiID}).then((res) => {
          if (res.data=='error') {
            alert("ERROR API DATA")
            return {"apiID":null,"Title":null,"PublishDate":null,"Authors": []};
          } else {
            return res.data;
          }
          
        }
      );

      
      setBook(book);
      
     
    };

    getBook();
   
  },[]);
 

  


  return (
    
    <div>
      
      <div class="row pr-5 pl-5 pt-3">
       
        <div id="book" class="col-9" >
          <Card>
            <Card.Header className="bg-dark text-white" as="h4">
              {book.Title}
            </Card.Header>  
            <Card.Body data-item={book.apiID} key={book.apiID} >
              <Card.Text>{book.PublishDate}</Card.Text>
              <Card.Text>{book.Authors}</Card.Text>
              </Card.Body>
              
          </Card>

        </div>
        <div class="col-3">
 
        <button class="w-100 mt-1 btn btn-outline-primary" data-item={book.id} onClick={addPrice} >Add Price</button>
       
        </div>
      </div>
    </div>
    
    
  );
 
}

export default Book;
