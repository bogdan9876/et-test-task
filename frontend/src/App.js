import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Header from './components/Header/header';
import Catalog from './components/Catalog/catalog';
import MedicamentDetail from './components/MedicamentDetail/medicamentDetail';
import Cart from './components/Cart/cart';
import FormikPage from './components/FormikPage/formikPage';
import SuccessPage from './components/SuccessPage/successPage';

function MainComponent() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [location]);

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Routes>
        <Route path="/" element={<Catalog searchTerm={searchTerm} />} />
        <Route path="/medicament/:id" element={<MedicamentDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/formik" element={<FormikPage /> } />
        <Route path="/success" element={<SuccessPage /> } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <MainComponent />
    </Router>
  );
}

export default App;
