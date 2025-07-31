import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/DriverDetails.css';
import '../index.css';
import { FaIdCard, FaPhoneAlt } from 'react-icons/fa';

const driversData = [
  { id: 1, name: 'John Smith', license: 'AB1234', phone: '555-1234' },
  { id: 2, name: 'Emma Johnson', license: 'CD5678', phone: '555-5678' },
];

const DriverDetails = () => {
  const { id } = useParams();
  const driver = driversData.find(d => d.id === parseInt(id));

  if (!driver) return <div className="driver-details-container"><p>Driver not found</p></div>;

  return (
    <div className="driver-details-container">
      <div className="driver-details-card">
        <h3 className="driver-name">{driver.name}</h3>
        <p><FaIdCard style={{ marginRight: '8px' }} /><strong>License:</strong> {driver.license}</p>
        <p><FaPhoneAlt style={{ marginRight: '8px' }} /><strong>Phone:</strong> {driver.phone}</p>
      </div>
    </div>
  );
};

export default DriverDetails;
