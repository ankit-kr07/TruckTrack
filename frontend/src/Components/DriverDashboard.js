import React from 'react';
import BreakTracker from './BreakTracker';
import FuelLog from './FuelLog';
import SafetyScore from './SafetyScore';
import SupportTickets from './SupportTickets';
import '../styles/global.css';

const DriverDashboard = () => {
  return (
    <div className="driver-dashboard">
      <h2>Welcome, Driver</h2>
      
      <section className="dashboard-section">
        <h3>Break Tracker</h3>
        <BreakTracker />
      </section>
      
      <section className="dashboard-section">
        <h3>Fuel Stats</h3>
        <FuelLog />
      </section>
      
      <section className="dashboard-section">
        <h3>Safety Score</h3>
        <SafetyScore />
      </section>

      <section className="dashboard-section">
        <h3>Support & Complaints</h3>
        <SupportTickets />
      </section>
    </div>
  );
};

export default DriverDashboard;
