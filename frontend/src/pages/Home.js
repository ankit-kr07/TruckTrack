import React from 'react';

import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
    <div
    className="vh-100 d-flex flex-column justify-content-center align-items-center text-white text-center"
    style={{ backgroundColor: '#121212' }}
    >
      
      <h1 className="display-3 fw-bold mb-3">Welcome to Your Logbook</h1>
      <p className="lead mb-4" style={{ maxWidth: '600px' }}>
        Stay organized and compliant with your daily logs and truck data.
      </p>
      <Link to="/login" className="btn btn-lg btn-primary fw-bold px-5 py-3">
        Start Your Trip
      </Link>
    </div>
    </div>
  );
};

export default Home;
