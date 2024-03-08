import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CatalogFilter from '../CatalogFilter/catalogFilter';
import Loader from '../Loader/loader';
import { getFilteredMedicaments } from '../../api';
import './catalog.css';

function Catalog({ searchTerm }) {
  const [filteredMedicaments, setFilteredMedicaments] = useState([]);
  const [sort, setSort] = useState('');
  const [idOption, setIdOption] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useRef(false);

  const applyFilters = async () => {
    setIsLoading(true);
    try {
      const data = await getFilteredMedicaments({ "title":searchTerm, "store":idOption, "maxPrice":price});
      setFilteredMedicaments(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      applyFilters();
    };

    if (hasMounted.current) {
      fetchData();
    } else {
      hasMounted.current = true;
    }

  }, [sort, idOption, price, searchTerm]);

  const handleApplyFilters = (filters) => {
    setSort(filters.sort);
    setIdOption(filters.idOption);
    setPrice(filters.priceRange);
  };

  return (
    <>
      <CatalogFilter onApplyFilters={handleApplyFilters} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Loader />
        </div>
      ) : (
        <div className="catalog-wrapper">
          <div className="catalog">
            {filteredMedicaments.map((medicament) => (
              <div key={medicament.id} className="medicament">
                <img src={medicament.image} alt={medicament.title} width="300" height="250" />
                <h3>{medicament.title}</h3>
                <p>{medicament.description}</p>
                <p><span style={{ fontWeight: 'bold' }}>Price:</span> {medicament.price} uah</p>
                <Link to={`/medicament/${medicament.id}`} className="medicament-link">View more</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Catalog;
