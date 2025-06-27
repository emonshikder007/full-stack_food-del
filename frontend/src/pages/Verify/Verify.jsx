import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyOrder = async () => {
    try {
      const response = await axios.post(url+"/api/order/verify", { orderId });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Order verification failed:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (orderId) {
      verifyOrder();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
