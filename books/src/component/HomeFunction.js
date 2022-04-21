
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
  const [loadingModal, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [libraries, setLibrary] = useState([]);
  const [books, setBooks] = useState([{id: 'test',volumeInfo: {title: 'Title', publishedDate: 'publishDate', authors: ['test']}}]);



  useEffect(()=>{
    const fetchlibiraries = async() =>{
      setLoading(true);
      const libraries= await axios.post('http://localhost/gbooks/public/libraryList').then((res) => {
        setLoading(false);
        return res.data;
        }
      );
      setLibrary(libraries);
    };

    fetchlibiraries();

    const fetchbooks = async() =>{
      setLoading(true);
      const book= await axios.post('http://localhost/gbooks/public/books').then((res) => {
        setLoading(false);
        return res.data;
        
      }
      );
      
      setBooks(book);
    };

 
    fetchbooks();
   
  },[]);


  const refreshBooks = async() =>{
    setLoading(true);
  
    const book= await axios.post('http://localhost/gbooks/public/searchBook',{search}).then((res) => {
        setLoading(false);
        console.log(res.data);
        return res.data;
      }
    );
    
    setBooks(book);
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
      <div class="row pl-5 pr-5 pt-3">
      <InputGroup className="mb-3">
        <FormControl
         
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Book"
          aria-label="Search Book"
          aria-describedby="basic-addon2"
        />
        <Button onClick={searchBook} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      {loadingModal ? (
        <Loading />
      ) : (
        ""
      )}
      {
       
        books.map(book => 
            <div id="Book-List" class="col-3 mb-4" style={{height: '250px'}}>
              <Card border="success" style={{height: '250px'}} >
               <Card.Header className="bg-dark text-white" > {book.volumeInfo.title}</Card.Header>  
                <Card.Body data-item={book.id} key={book.id} onClick={checkBook}>
                  <Card.Text>{book.volumeInfo.publishedDate}</Card.Text>
                
                  <Card.Text>{book.volumeInfo.authors}</Card.Text>   
                  
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