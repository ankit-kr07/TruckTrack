import React, { useState, useEffect } from 'react';
import '../styles/TruckManagement.css'; // Add this line to link styles

const TruckManagement = () => {
  const [trucks, setTrucks] = useState(() => {
    const saved = localStorage.getItem('trucks');
    return saved ? JSON.parse(saved) : [];
  });

  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    id: null,
    truckId: '',
    model: '',
    licensePlate: '',
    assignedDriver: '',
  });

  useEffect(() => {
    localStorage.setItem('trucks', JSON.stringify(trucks));
  }, [trucks]);

  useEffect(() => {
    const savedDrivers = JSON.parse(localStorage.getItem('drivers')) || [];
    setDrivers(savedDrivers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      id: null,
      truckId: '',
      model: '',
      licensePlate: '',
      assignedDriver: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.truckId || !form.licensePlate) {
      alert('Truck ID and License Plate are required');
      return;
    }

    const isDriverAlreadyAssigned = trucks.some(t =>
      t.assignedDriver === form.assignedDriver && t.id !== form.id
    );

    if (isDriverAlreadyAssigned) {
      alert('This driver is already assigned to another truck.');
      return;
    }

    if (form.id) {
      setTrucks(trucks.map(t => (t.id === form.id ? form : t)));
    } else {
      setTrucks([...trucks, { ...form, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (truck) => setForm(truck);

  const handleDelete = (id) => {
    if (window.confirm('Delete this truck?')) {
      setTrucks(trucks.filter(t => t.id !== id));
    }
  };

  const getAvailableDrivers = () => {
    const assigned = trucks.map(t => t.assignedDriver);
    const allDrivers = drivers.map(d => d.name);
    return allDrivers.filter(name =>
      name === form.assignedDriver || !assigned.includes(name)
    );
  };

  return (
    <div className="truck-management-container">
      <div className="truck-management-card">
        <h3 className="truck-management-title">Truck Management</h3>
        <form onSubmit={handleSubmit} className="truck-management-form">
          <div className="form-row">
            <div>
              <label>Truck ID *</label>
              <input
                type="text"
                name="truckId"
                value={form.truckId}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={form.model}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label>License Plate *</label>
              <input
                type="text"
                name="licensePlate"
                value={form.licensePlate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div>
              <label>Assign Driver</label>
              <select
                name="assignedDriver"
                value={form.assignedDriver}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">-- Select Driver --</option>
                {getAvailableDrivers().map((driver, idx) => (
                  <option key={idx} value={driver}>
                    {driver}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="truck-management-buttons">
            <button type="submit" className="btn btn-primary">
              {form.id ? 'Update Truck' : 'Add Truck'}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Clear
            </button>
          </div>
        </form>

        <h5 className="truck-management-title">Truck List</h5>
        {trucks.length === 0 ? (
          <p>No trucks added.</p>
        ) : (
          <div className="table-responsive">
            <table className="truck-table">
              <thead>
                <tr>
                  <th>Truck ID</th>
                  <th>Model</th>
                  <th>License Plate</th>
                  <th>Assigned Driver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map(truck => (
                  <tr key={truck.id}>
                    <td>{truck.truckId}</td>
                    <td>{truck.model || '-'}</td>
                    <td>{truck.licensePlate}</td>
                    <td>{truck.assignedDriver || '-'}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(truck)}>
                        Edit
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleDelete(truck.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckManagement;
