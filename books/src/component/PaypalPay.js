
import React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";


function PaypalPay(props) {
  const paypal = useRef();
  let loaded = 0;
  let navigate = useNavigate();
  useEffect(() => {
    if (loaded==0) {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Purchase Product",
                amount: {
                  currency_code: "PHP",
                  value: props.Price
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const Order = await actions.order.capture();
          const CartID = props.CartID;
          const Amount = props.Price;

          const sanctum = JSON.parse(localStorage.getItem('sanctum'));
    
          const headers = {
              accept: 'application/json',
              authorization: 'Bearer '+sanctum,
          } 
      
          
          axios.defaults.withCredentials = true;
          
          const PurchaseResult =await axios.post('http://localhost/booksclean/public/api/purchaseEQS', {CartID,Amount},{headers: headers}).then((res) => {
              return res.data;
            }
          );

          alert("Purchase Successful");
          navigate('/cart');
        },
        onError: (err) => {
          alert(err);
        },
      })
        .render(paypal.current);
      loaded=loaded+1;
      }
  }, []);

  return (
    <div ref={paypal}></div>
  );
}

export default PaypalPay;