import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, incrementItemQuantity, decrementItemQuantity } from '../../redux/cartActions';
import './cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrementQuantity = (itemId) => {
    dispatch(incrementItemQuantity(itemId));
  };

  const handleDecrementQuantity = (itemId, quantity) => {
    if (quantity === 1) {
      const confirmed = window.confirm('Are you sure to remove this item from cart?');
      if (confirmed) {
        dispatch(removeFromCart(itemId));
      }
    } else {
      dispatch(decrementItemQuantity(itemId));
    }
  };

  const handleBackToCatalog = () => {
    navigate('/');
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const handleItemDetailClick = (itemId) => {
    navigate(`/medicament/${itemId}`);
  };

  const handleClearItem = (itemId) => {
    const confirmed = window.confirm('Are you sure to remove this item from cart?');
    if (confirmed) {
      dispatch(removeFromCart(itemId));
    }
  };

  const handleClearAllItems = () => {
    const confirmed = window.confirm('Are you sure to remove all items from cart?');
    if (confirmed) {
      cartItems.forEach((item) => {
        dispatch(removeFromCart(item.id));
      });
    }
  };

  const handleFormikPageClick = () => {
    navigate(`/formik`);
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 && (
        <>
      <ul className="cart-items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img className='cart-item-image' src={item.image} onClick={() => handleItemDetailClick(item.id)} alt={item.title} width="120" height="120" style={{ cursor: 'pointer' }}/>
            <div className="item-details">
              <div className='title'>
              <p className='cart-item-name' onClick={() => handleItemDetailClick(item.id)} style={{ cursor: 'pointer' }}> {item.title}</p>
              </div>
              <div className='quantity'>
              <button onClick={() => handleDecrementQuantity(item.id, item.quantity)}>-</button>
              <p className='cart-item-quantity'>{item.quantity}</p>
              <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
              </div>
              <div className='price'>
              <p className='cart-item-price'>{item.price * item.quantity} uah</p>
              </div>
              <div className='clear'>
              <button onClick={() => handleClearItem(item.id)}>Clear</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total amount: {calculateTotalAmount()} uah</p>
      </div>
      <div className="cart-buttons">
        <div className='cart-buttons-2'>
        <button onClick={handleBackToCatalog}>Back to Catalog</button>
        <button onClick={handleClearAllItems}>Clear All</button>
        </div>
        <button className='cart-buttons-last-button' onClick={handleFormikPageClick}>Continue</button>
      </div>
        </>
      )}
    </div>
  );
};

export default Cart;