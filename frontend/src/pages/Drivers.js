import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Drivers.css'; // Import external CSS

const driversData = [
  { id: 1, name: 'John Smith', license: 'AB1234', phone: '555-1234' },
  { id: 2, name: 'Emma Johnson', license: 'CD5678', phone: '555-5678' },
];

const Drivers = () => {
  return (
    <div className="drivers-page-container">
      <div className="card p-4 shadow drivers-page">
        <h2>Drivers</h2>
        <ul className="list-group">
          {driversData.map(driver => (
            <li key={driver.id} className="list-group-item d-flex justify-content-between align-items-center driver-item">
              <span>{driver.name}</span>
              <Link to={`/drivers/${driver.id}`} className="btn btn-sm btn-dark">View Details</Link>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Drivers;
