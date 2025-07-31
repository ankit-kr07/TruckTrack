import React from 'react';
import { Outlet } from 'react-router-dom';

const DriverFeatures = () => {
  return (
    <div className="container p-0 ">
      
      <Outlet />
    </div>
  );
};

export default DriverFeatures;
