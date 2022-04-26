
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Navigate,Link,useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';





function Library() {
  
  let navigate = useNavigate();

  const [libraries, setLibrary] = useState([]);

  useEffect(()=>{
    const getLibrary = async() =>{
      const library= await axios.get('http://localhost/booksapi/public/library').then((res) => {
        return res.data; 
        }
      );
      setLibrary(library);
    };
    getLibrary();
  },[]);

  const refreshLibrary = async() =>{
    const library= await axios.get('http://localhost/booksapi/public/library').then((res) => {
      return res.data; 
      }
    );
    setLibrary(library);
  };
 
  const deleteBook = product => {
    const LibraryUserID = product.target.getAttribute('data-item');
    console.log(LibraryUserID);
    axios.post('http://localhost/booksapi/public/deleteBook', {LibraryUserID}).then(
      res => {
        console.log(res);
        refreshLibrary();
      }
    )
  }

  const deleteLibrary = product => {
    const LibraryID = product.target.getAttribute('data-item');
    axios.post('http://localhost/booksapi/public/deleteLibrary', {LibraryID}).then(
     res => {
        refreshLibrary();
      }
    )
  }

  const addLibrary = product => {
    const LibraryID = product.target.getAttribute('data-item');
    navigate('/library/add');
  }

  const editLibrary = product => {
    const LibraryID = product.target.getAttribute('data-item');
    navigate('/library/edit/'+LibraryID);
  }



  const checkBook = product => {
    const apiID = product.target.getAttribute('data-item');
    navigate('/home/'+apiID);
  }


  
  return (
    <div>
    
     
      <div class="row pl-5 pr-5 pt-3">
        <div class="col-12">
        <h3> Library </h3>
        </div>
     <div class="col-12">
     <button onClick={addLibrary} class=" mt-1 btn btn-outline-primary" >Add Library</button>
     </div>
      
      {
        libraries
          .map(library =>  
            <div id="Library-List" class="col-12 pb-1 pt-4" >
              <Card>
                <Card.Header className="bg-dark text-white" as="h4">{library.Title.substring(30,0)+'....'}
                
                  <button data-item={library.LibraryID} onClick={editLibrary} class="float-right mr-3 mt-1 btn btn-primary" >Edit Library</button>
                  <button data-item={library.LibraryID} onClick={deleteLibrary} class=" float-right mr-3 mt-1 btn btn-danger" >Remove Library</button>
               
                </Card.Header>  
                <Card.Body data-item={library.LibraryID} key={library.LibraryID} >
                  <Card.Text>
                    {library.Description}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Table  striped bordered hover>
                <thead className="bg-dark text-white">
                    <th>Books</th>
                    <th></th>
                    <th></th>
                    </thead>
                <tbody>
                {
                  library.Books.map(book => 
                  <tr>
                    <td >
                      <label data-item={book.apiID} onClick={checkBook}>{book.BookName} : {book.Title}</label>
                    </td>
                    <td >
                      <label data-item={book.apiID} onClick={checkBook}>{book.PublishDate}</label>
                    </td>
                    <td>
                      <button data-item={book.LibraryUserID}  onClick={deleteBook} class=" mt-1 btn btn-outline-danger" >Remove Book</button>
                    </td>
                  </tr>
                  )
                }
                </tbody>
              </Table>
            </div>
          )
      } 
      </div>
    </div>
  )
}


export default Library;