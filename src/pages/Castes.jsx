import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CastesForm from '../components/CastesForm';
import Header from '../components/Header'; 

const Castes = () => {
  return (
    <div className="container" id="root">
      <Header />
      <CastesForm/>
    </div>
  );
};

export default Castes;