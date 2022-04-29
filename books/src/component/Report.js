
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Navigate,Link,useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';





function Report() {
  
  let navigate = useNavigate();
  const [month, setMonth] = useState(4);
  const [cartPurchase, setPurchase] = useState([{Price:0,Total: 0,Amount:0,cart: {CartID:'x', cart_book: {ApiID: 'x',Name: 'x',Price: 0}, cart_user: {name: 'x'}}}]);
  const [year, setYear] = useState(2022);
  useEffect(()=>{

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;

    const getPurchase = async() =>{

      
      const purchase= await axios.get('http://localhost/booksclean/public/api/getPurchaseEQS',{headers: headers}).then((res) => {
 
        return res.data; 
        }
      );
      if (purchase=='no-results') {
        
        setPurchase([{Price:0,Total: 0,Amount:0,cart: {CartID:'', cart_book: {ApiID: '',Name: '',Price: 0}, cart_user: {name: ''}}}]);
      } else {
        setPurchase(purchase);
      }
     
    };
    getPurchase();
  },[]);

  const refreshPurchase = async() =>{

    const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer '+sanctum,
    } 

    
    axios.defaults.withCredentials = true;
    
    const purchase= await axios.post('http://localhost/booksclean/public/api/searchPurchaseEQS',{month,year},{headers: headers}).then((res) => {
       
       return res.data; 
      
      }
    );

   

    if (purchase=='no-results') {
      setPurchase([{Price:0,Total: 0,Amount:0,cart: {CartID:'', cart_book: {ApiID: '',Name: '',Price: 0}, cart_user: {name: ''}}}]);
    } else {
      setPurchase(purchase);
    }
   
  };
 

  const runReport = report => {
    refreshPurchase();
  }

  const checkBook = product => {
    const apiID = product.target.getAttribute('data-item');
    navigate('/home/'+apiID);
  }

  const printReport = report => {
    var content = document.getElementById("reportPurchase");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  
  return (
    <div class="pr-5 pl-5 pt-3">
      <iframe id="ifmcontentstoprint" style={{height: 0, width: 0, position: 'absolute'}}></iframe>
      <h3> Report </h3>
      
      <select onChange={e => setMonth(e.target.value)}>
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option selected value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
      </select>
      <select onChange={e => setYear(e.target.value)}>
      <option selected value="2022">2022</option>
      <option value="2021">2021</option>
      <option value="2020">2020</option>
      <option value="2019">2019</option>
      </select>
      <button onClick={runReport}>
          Run Report
      </button>
      <button onClick={printReport}>
          Print Report
      </button>
      <Card  id='reportPurchase' className="p-3">
      
        <table >
        <tbody>
          <th>Book ID</th>
          <th >Book Name</th>
          <th>Price(₱)</th>
          <th >User</th>
          <th>Date</th>
          <th>Month</th>
          <th>Year</th>
          <th>Amount(₱)</th>
          <th >Status</th>
        </tbody>
        <tbody>
          {
            cartPurchase
            .map(purchase => 
                <tr>
                    <td>
                      
                      <label>{purchase.cart.cart_book.ApiID}</label>
                    </td>
                    <td>
                      <label>{purchase.cart.cart_book.Name}</label>
                    </td>
                    <td>
                      <label>{purchase.cart.cart_book.Price.toFixed(2)}</label>
                    </td>
                    <td>
                      
                      <label>{purchase.cart.cart_user.name}</label>
                    </td>
                    <td>
                      <label>{purchase.xTimestamp}</label>
                    </td>
                    <td>
                
                      <label>{purchase.Month}</label>
                    </td>
                  
                    <td>
                      <label>{purchase.Year}</label>
                    </td>
                    <td>
                      <label>{purchase.Amount.toFixed(2)}</label>
                    </td>
                    <td>
                      <label>{purchase.Purchase}</label>
                    </td>

                </tr>

            )
          }
           <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>
          </tbody>
          <tbody>
            <tr>
              <td><b>Total</b></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              
              <td></td>
              <td>{cartPurchase[0].Total.toFixed(2)}</td>
              <td></td>
              <td></td>
              </tr>
          </tbody>
          </table>
      </Card>  
    </div>
  ) 
}


export default Report;