
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	useParams,useNavigate,Link
} from "react-router-dom";
import Modal from 'react-modal';
import Card from 'react-bootstrap/Card';
import './Home.css';


function Loading() {
  

  
  return (
    
    
       <Modal isOpen={true} id="modal-loading" aria-labelledby="example-modal-sizes-title-sm"
      >
        Please Wait
       </Modal> 
    
    
  );
 
}

export default Loading;
