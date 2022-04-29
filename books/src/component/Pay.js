
import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams} from "react-router-dom";
import PaypalPay from "./PaypalPay";

function Pay() {
  let { CartID } = useParams();
  const [checkOut, setCheckOut] = useState(false);
  const [carts, setCart] = useState([{Price: '0'}]);
	
  useEffect(()=>{
    
    const getCartItem = async() =>{
      
      const cartItem= await axios.post('http://localhost/booksapi/public/cartItemEQS', {CartID}).then((res) => {
        return res.data;

      }
    );
    
    setCart(cartItem);
    };
    getCartItem();
  },[]);
  
  
  return (
    <div class="row p-5">
      <div class="col-9">
        <Card>
          <Card.Header className="bg-dark text-white" as="h4">
            {carts.Name}
            <label class="float-right">₱{carts.Price}</label>
          </Card.Header>  
          <Card.Body data-item={carts.CartID} key={carts.CartID}>
            <Card.Text>{carts.Description}</Card.Text>
          </Card.Body>        
        </Card>
      </div>
      <div class='col-3'>
      <ButtonGroup className="mb-2">
        <Button onClick={()=>{setCheckOut(true);}}> 
          Paypal 
        </Button>
      </ButtonGroup>
      {checkOut ?  ( <PaypalPay CartID={carts.CartID} Price={carts.Price} />) : ("")}
      </div>
    </div>
  );
}

export default Pay;
