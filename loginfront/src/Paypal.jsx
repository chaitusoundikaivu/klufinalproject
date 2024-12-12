import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Razorpay from 'razorpay'

import Success from './Success';
const Paypal = () => {
  const navigate = useNavigate();

  const loadRazorpay = () => {
    
    navigate('/sucess');
    
    
    script.onload = async () => {
      try {
        const result = await axios.post('/create-order', { amount: 50000 }); // Amount in paise

        const { amount, id: order_id, currency } = result.data;

        const options = {
          key: 'YOUR_RAZORPAY_KEY',
          amount: amount.toString(),
          currency: currency,
          name: 'Fee Payment',
          description: 'Pay your fees',
          order_id: order_id,
          handler: async (response) => {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post('/payment-success', data);

            alert(result.data.msg);
            navigate('/success');
          },
          prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#80c0f0',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div>
      <h2>Pay Fee</h2>
      <button onClick={loadRazorpay}>Pay Now</button>
    </div>
  );
};

export default Paypal;
