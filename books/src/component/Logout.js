
import React from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";



function Logout() {
  let navigate = useNavigate();
  
  useEffect(()=>{
    const logmeout = async() =>{
      sessionStorage.setItem('token', JSON.stringify(false));
      sessionStorage.setItem('userType', "");
      navigate('/login');
      window.location.reload(false);

    };
    
    logmeout();

   
  },[]);


  return (
    <div></div>
    
    
  );
 
}

export default Logout;
