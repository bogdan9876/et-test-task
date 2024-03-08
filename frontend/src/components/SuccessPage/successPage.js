import React from 'react';
import { useNavigate } from 'react-router-dom';
import './successPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleBackToCatalog = () => {
    navigate('/');
  };

  return (
    <div className='success'>
      <img src="images/success-icon.png" alt="logo" />
      <h2>Success</h2>
      <p>Your order was sent to processing!</p>
      <p>Check your email box for further information.</p>
      <button onClick={handleBackToCatalog}>Go back to Catalog</button>
    </div>
  );
};

export default SuccessPage;
