
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
  


  const setModalIsOpenToTrue =()=>{
    setIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
    setIsOpen(false)
  }

  const addToLibrary = (event) => {
    const LibraryID = event.target.getAttribute('data-item');
    const apiID = book.apiID;
    const Title = book.Title;
    const PublishDate = book.PublishDate;
    axios.post('http://localhost/booksapi/public/addBook', {LibraryID,apiID,Title,PublishDate}).then(
      res => {
          setModalIsOpenToFalse();
        }
      )
  };

  const addPrice = event => {
    const apiID = book.apiID;
    const Title = book.Title;
    const PublishDate = book.PublishDate;
    axios.post('http://localhost/booksapi/public/addBookPrice', {apiID,Title,PublishDate}).then(
      res => {
          navigate('/home/price/'+apiID);
        }
      )
  }

  const addcart = (event) => {
    const apiID = book.apiID;
    const Title = book.Title;
    const PublishDate = book.PublishDate;
    axios.post('http://localhost/booksapi/public/addBookPrice', {apiID,Title,PublishDate}).then(
    res => {
      
      }
    )

    axios.post('http://localhost/booksapi/public/addCart', {apiID}).then(
      res => {
        navigate('/cart');
      }
    )
  };

  useEffect(()=>{
    const libraryList = async() =>{
      const libraryList = await axios.post('http://localhost/booksapi/public/libraryList').then((res) => {
        return res.data;
        }
      );
      setLibraryList(libraryList);

    };
    
    libraryList();
    
    const getBook = async() =>{
      
      const book = await axios.post('http://localhost/booksapi/public/book', {apiID}).then((res) => {
         
          return res.data;
        }
      );

      
      setBook(book);
      
     
    };

    getBook();
   
  },[]);
 

  


  return (
    
    <div>
      <Modal isOpen={modalIsOpen}>
         
          <h2>{book.id}</h2>
          <button class=" mt-1 btn btn-outline-danger" onClick={setModalIsOpenToFalse}>x</button>
          {
            libraryList.map(library => 
                <div id="booklist" class="pb-1 pt-2 col-12" >
                  <Card >
                    <Card.Body data-item={library.Title} key={library.Title} >
                      <div class="row">
                        <div class="col-10"><Card.Text>{library.Title}</Card.Text></div>
                        <div class="col-2"><button class="w-100 mt-1 btn btn-outline-primary" data-item={library.LibraryID} onClick={addToLibrary}>Add to Library</button></div>
                      </div>
                    </Card.Body>
                  </Card> 
                </div>
            )
          }
        </Modal> 
        
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
