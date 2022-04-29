
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	useParams,useNavigate,Link
} from "react-router-dom";
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';
import Loading from "./Loading";


function Book() {
  let { apiID } = useParams();
  const [loadingModal, setLoading] = useState(false);
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

    axios.post('http://localhost/booksclean/public/addBookEQS', {LibraryID,apiID,Title,PublishDate}).then(
      res => {
          setModalIsOpenToFalse();
          alert('Book added to library');
        }
      )
  };

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

  const addcart = (event) => {
    const apiID = book.apiID;
    const UserID = sessionStorage.getItem('userID');

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;
    
    axios.post('http://localhost/booksclean/public/api/addCartEQS', {apiID,UserID}, {headers: headers}).then(
    res => {
       
        if (res.data=='price_not_set') {
          alert('Book Unavailable');
        } else {
          navigate('/cart');
        }
      }
    )

    // axios.post('http://localhost/booksapi/public/addCart', {apiID}).then(
    //   res => {
    //     navigate('/cart');
    //   }
    // )
  };

  useEffect(()=>{
    setLoading(true);

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;

    const libraryList = async() =>{
      const UserID = sessionStorage.getItem('userID');
      const libraryList = await axios.post('http://localhost/booksclean/public/api/libraryListEQS', {UserID}, {headers: headers}).then((res) => {
        return res.data;
        }
      );
      setLibraryList(libraryList);

    };
    
    libraryList();
    
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
      setLoading(false);
      
     
    };

   
    getBook();
   
  },[]);
 

  


  return (
    
    <div>
      {loadingModal ? (
        <Loading />
      ) : (
        ""
      )}
      <Modal isOpen={modalIsOpen}>
         
          <h2>{book.id}</h2>
          <button class=" mt-1 btn btn-outline-danger" onClick={setModalIsOpenToFalse}>x</button>
          {
            libraryList.map(library => 
                
                <div id="booklist" class="pb-1 pt-2 col-10" >
                  
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
       <div class="col-2 pr-0 border-black">
       <img width="100%" height="200px"
                      src={book.img}
                      alt="new"
                      />
       </div>
        <div id="book" class="col-7" >
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
        <button data-item={book.apiID} class="w-100 mt-1 btn btn-outline-primary" onClick={setModalIsOpenToTrue} >Add Library
        </button>
        
        <button class="w-100 mt-1 btn btn-outline-primary" data-item={book.id} onClick={addcart}> Add Cart</button>
        </div>
      </div>
    </div>
    
    
  );
 
}

export default Book;
