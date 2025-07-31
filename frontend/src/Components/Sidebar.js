import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        {!collapsed && <h3>TruckTrack</h3>}
        <div>
          {/* Collapse toggle button visible only on md+ devices */}
          <button
            className="btn btn-sm btn-light d-none d-md-inline me-2"
            onClick={handleCollapseToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '»' : '«'}
          </button>

          {/* Close button for mobile only */}

        </div>
      </div>

      <nav className="nav flex-column">
        <NavLink
          to="/dailylogs"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Daily Logs"
        >
          <i className="bi bi-journal-text"></i>
          {!collapsed && ' Daily Logs'}
        </NavLink>

        <NavLink
          to="/drivers"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Drivers"
        >
          <i className="bi bi-people"></i>
          {!collapsed && ' Drivers'}
        </NavLink>

        {/* Driver Feature: Breaks */}
        <NavLink
          to="/driver-features/breaks"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Breaks"
        >
          <i className="bi bi-clock-history"></i>
          {!collapsed && ' Breaks'}
        </NavLink>

        {/* Driver Feature: Inspection */}
        <NavLink
          to="/driver-features/inspection"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Truck Inspection"
        >
          <i className="bi bi-wrench-adjustable-circle"></i>
          {!collapsed && ' Inspection'}
        </NavLink>

        {/* Driver Feature: Fuel Log */}
        <NavLink
          to="/driver-features/fuellog"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Fuel Log"
        >
          <i className="bi bi-fuel-pump"></i>
          {!collapsed && ' Fuel Log'}
        </NavLink>
        <NavLink
          to="/driver-management"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Driver Management"
        >
          <i className="bi bi-person-badge"></i>
          {!collapsed && ' Driver Management'}
        </NavLink>
        <NavLink
          to="/driver-features/truckmanagement"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Truck Management"
        >
          <i className="bi bi-truck"></i>
          {!collapsed && ' Truck Management'}
        </NavLink>

        <NavLink
          to="/driver-features/incident-support"
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          title="Incident Support"
        >
          <i className="bi bi-exclamation-circle"></i>
          {!collapsed && ' Incident Support'}
        </NavLink>

      </nav>

    </div>
  );
};

export default Sidebar;