import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from './Components/AuthContext';

import DailyLogs from './pages/DailyLogs';
import Drivers from './pages/Drivers';
import DriverDetails from './pages/DriverDetails';
import LoginPage from './pages/LoginPage';

import Layout from './Components/Layout';
import DriverFeatures from './pages/DriverFeatures';
import BreakTracker from './Components/BreakTracker';
import TruckInspection from './Components/TruckInspection';
import FuelLog from './Components/FuelLog';
import DriverManagement from './pages/DriverManagement';
import TruckManagement from './pages/TruckManagement';
import IncidentSupport from './Components/IncidentSupport';

import Home from './pages/Home';




const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Home />} />


        <Route
          path="/dailylogs"
          element={
            <ProtectedRoute>
              <Layout>
                <DailyLogs />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/drivers"
          element={
            <ProtectedRoute>
              <Layout>
                <Drivers />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/drivers/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <DriverDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Redirect root path to /dailylogs */}
        <Route path="/" element={<Navigate to="/home" />} />
       <Route
  path="/driver-features/*"
  element={
    <ProtectedRoute>
      <Layout>
        <DriverFeatures />
      </Layout>
    </ProtectedRoute>
  }
>
  <Route path="breaks" element={<BreakTracker />} />
  <Route path="inspection" element={<TruckInspection />} />
  <Route path="fuellog" element={<FuelLog />} />
  <Route path="drivermanagement" element={<DriverManagement />} />
  <Route path="truckmanagement" element={<TruckManagement />} />
  <Route index element={<Navigate to="breaks" />} />
  <Route path="incident-support" element={<IncidentSupport />} />
  
  
</Route>
<Route
  path="/driver-management"
  element={
    <ProtectedRoute>
      <Layout>
        <DriverManagement />
      </Layout>
    </ProtectedRoute>
  }
/>


    


      </Routes>
    </Router>
  );
}

export default App;
