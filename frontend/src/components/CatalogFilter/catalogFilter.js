import React, { useState } from 'react';
import './CatalogFilter.css';
import { getFilteredMedicaments } from '../../api';

const idOptions = [
  { value: '', label: 'Choose store' },
  { value: 'DS', label: 'DS' },
  { value: 'Znahar', label: 'Znahar' },
  { value: 'Medic', label: 'Medic' },
];

const CatalogFilter = ({ onApplyFilters }) => {
  const [idOption, setIdOption] = useState('');
  const [priceRange, setPriceRange] = useState(16000);

  const handleApply = async () => {
    try {
      const data = await getFilteredMedicaments({ store: idOption, minPrice: 0, maxPrice: priceRange });
      onApplyFilters({ idOption, priceRange });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSliderChange = (event) => {
    setPriceRange(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <select className="selectSort" value={idOption} onChange={(e) => setIdOption(e.target.value)}>
          {idOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="slider-container">
          <input
            type="range"
            min={0}
            max={16000}
            step={1}
            value={priceRange}
            onChange={handleSliderChange}
            className="slider"
          />
          <div>
            Price: {0} - {priceRange} uah
          </div>
        </div>
        <button className="myButton" onClick={handleApply}>
          <span>Apply</span>
        </button>
      </div>
    </div>
  );
};

export default CatalogFilter;
