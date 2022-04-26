
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  useNavigate
} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';

function Cart() {
  let navigate = useNavigate();
  const [cart, setCart] = useState([{Price:0}]);

  useEffect(()=>{
    const getCart = async() =>{
      const cart= await axios.post('http://localhost/booksapi/public/cart').then((res) => {
        return res.data;
        }
      );
      setCart(cart);
    };
    getCart();
  },[]);


  const purchase = cartItem => {
    const CartID = cartItem.target.getAttribute('data-item');
    const status = cartItem.target.getAttribute('status');
    
    if (status=='done') {
      alert('Item already Purchased')
    } else {
      navigate('/cart/pay/'+CartID);
    }

  }

  const checkBook = book => {
    const apiID = book.target.getAttribute('data-item');
    navigate('/home/'+apiID);
  }
  
  return (
    <div class="row p-5">
      <h3> My Cart </h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        { cart
            .map(cartItem => 
              <tr id={"cartItem-"+cartItem.CartID}>
                  <td onClick={checkBook} data-item={cartItem.ApiID}>{cartItem.Name}</td>
                  <td>{cartItem.Price.toFixed(2)}</td>
                  <td class={cartItem.Purchase=='done' ? ('text-success') : ('text-danger')} >{cartItem.Purchase}</td>
                  <td>
                    <button status={cartItem.Purchase} onClick={purchase} data-item={cartItem.CartID} key={cartItem.CartID} class={cartItem.Purchase=='done' ? ('mt-1 btn btn-outline-primary invisible') : ('mt-1 btn btn-outline-primary ')} >
                    
                        Checkout 
                    </button>
                  </td>
              </tr>
            )
        }
        </tbody>
      </Table>
    </div>
  ) 
}


export default Cart;