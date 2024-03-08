import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../Loader/loader';
import { getLampById } from '../../api';
import { addToCart } from '../../redux/cartActions';
import './medicamentDetail.css';

function MedicamentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lamp, setLamp] = useState(null);
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLamp = async () => {
      setIsLoading(true);
      try {
        const data = await getLampById(id);
        setLamp(data);
      } catch (error) {
        console.error('Error fetching lamp details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (hasMounted.current) {
      fetchLamp();
    } else {
      hasMounted.current = true;
    }
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader />
      </div>
    );
  }
  
  if (!lamp) {
    return <div>Medicament not found</div>;
  }

  const handleGoBack = () => {
    navigate('/');
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    const lampWithQuantity = { ...lamp, quantity };
    const lampsToAdd = Array.from({ length: quantity }, () => lampWithQuantity);
    lampsToAdd.forEach((lamp) => {
      dispatch(addToCart(lamp));
    });
    navigate('/cart');
  };

  return (
    <div className="lamp-detail-container">
      <div className="lamp-detail">
        <img src={process.env.PUBLIC_URL + '/' + lamp.image} alt={lamp.title} width="700" height="500" />
        <div className="lamp-info">
          <button className="characteristic-btn blue">1 characteristic</button>
          <button className="characteristic-btn black">2 characteristic</button>
          <h3>{lamp.title}</h3>
          <p>{lamp.description}</p>
          <div className="lamp-detail-add-info">
            <div className="lamp-id">
              <h4>ID</h4>
              <p className="lamp-id-number">{lamp.id}</p>
            </div>
            <div className="lamp-selector-container">
              <h4>Select Producing Country:</h4>
              <select className="lamp-selector" value={color} onChange={handleColorChange}>
                <option>Select</option>
                <option>United States</option>
                <option>India</option>
                <option>China</option>
              </select>
            </div>
            <div className="lamp-selector-container">
              <h4>Select Quantity:</h4>
              <input type="number" className="lamp-quantity-selector" min="1" value={quantity} onChange={handleQuantityChange}/>
            </div>
          </div>
        </div>
      </div>
      <div className="lamp-actions">
        <p className="lamp-price">Price: {lamp.price} uah</p>
        <div className="action-buttons">
          <button onClick={handleGoBack}>Go Back</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default MedicamentDetail;