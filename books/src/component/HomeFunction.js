
import React from 'react';
import axios from 'axios';
import './Home.css';
import {BrowserRouter as Router,Navigate,Link,useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import Loading from "./Loading";





function HomeFunction() {
  let navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState();
  const [loadingModal, setLoading] = useState(true);
  const [search, setSearch] = useState();
  const [libraries, setLibrary] = useState([]);
  const [books, setBooks] = useState([{id: 'test',volumeInfo: {title: 'Title', publishedDate: 'publishDate', authors: ['test'], imageLinks: {thumbnail:'null'}}}]);



  useEffect(()=>{
    
    const fetchlibiraries = async() =>{
      
      const libraries= await axios.post('http://localhost/booksclean/public/libraryListEQS').then((res) => {
        
        return res.data;
        }
      );
      setLibrary(libraries);
    };

    fetchlibiraries();

    const fetchbooks = async() =>{
    
      const book= await axios.post('http://localhost/booksclean/public/books').then((res) => {
        
        return res.data;
        
      }
      );
      
      setBooks(book);
      
    };

 
    fetchbooks();
    setLoading(false);
  },[]);


  const refreshBooks = async() =>{
    setLoading(true);
  
    const book= await axios.post('http://localhost/booksclean/public/searchBook',{search}).then((res) => {
        
        console.log(res.data);
        return res.data;
      }
    );
    
    setBooks(book);
    setLoading(false);
  };

  const checkBook = book => {
    const apiID = book.target.getAttribute('data-item');
    navigate('/home/'+apiID);
  }

  
  const searchBook = book => {
  
    refreshBooks();
  }
    
  return (
    <div>
      
{loadingModal ? (
        <Loading />
      ) : (
        ""
      )}
      <div class="row pl-5 pr-5 pt-3">
      <InputGroup className="mb-3">
        <FormControl className="border border-secondary"
         
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Book"
          aria-label="Search Book"
          aria-describedby="basic-addon2"
        />
        <Button onClick={searchBook} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      
      {
       
        books.map(book => 
            <div id="Book-List" class="col-3 mb-4" style={{height: '350px'}}>
              
              <Card class='border border-secondary' style={{height: '350px'}} >
              <Card.Header  data-item={book.id}  onClick={checkBook} className="p-0 m-0 bg-dark text-white">
                <img width="335px" height="150px"
              src={book.volumeInfo.imageLinks.thumbnail}
              alt="new"
              /> 
              </Card.Header>
               <Card.Header  data-item={book.id}  onClick={checkBook} className="bg-dark text-white" > {book.volumeInfo.title}
               
               
              </Card.Header> 
             

                <Card.Body  data-item={book.id}  onClick={checkBook}>
                
                  <Card.Text  data-item={book.id}  onClick={checkBook}>{book.volumeInfo.publishedDate}</Card.Text>
                
                  <Card.Text  data-item={book.id}  onClick={checkBook}>{book.volumeInfo.authors}</Card.Text>   
                  
                </Card.Body>
                
              </Card>
        
            </div>  
        ) 
      }

      </div>
    </div>
  )
  
}


export default HomeFunction;