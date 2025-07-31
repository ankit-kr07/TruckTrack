import React, { useState } from 'react';
import '../styles/DriverManagement.css';

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    licenseNumber: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.licenseNumber) return;

    if (form.id) {
      // Update existing driver
      setDrivers(drivers.map((d) => (d.id === form.id ? form : d)));
    } else {
      // Add new driver
      setDrivers([
        ...drivers,
        { ...form, id: Date.now().toString() },
      ]);
    }
    resetForm();
  };

  const handleEdit = (driver) => {
    setForm(driver);
  };

  const handleDelete = (id) => {
    setDrivers(drivers.filter((d) => d.id !== id));
  };

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      licenseNumber: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className="driver-management">
      <div className="driver-management__card">
        <h3 className="driver-management__title">Driver Management</h3>

        <form onSubmit={handleSubmit} className="driver-management__form">
          <div className="driver-management__form-grid">
            <div className="driver-management__form-group">
              <label className="driver-management__label" htmlFor="name">Driver Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="driver-management__input"
                placeholder="Enter driver name"
              />
            </div>

            <div className="driver-management__form-group">
              <label className="driver-management__label" htmlFor="licenseNumber">License Number</label>
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                value={form.licenseNumber}
                onChange={handleChange}
                className="driver-management__input"
                placeholder="Enter license number"
              />
            </div>

            <div className="driver-management__form-group">
              <label className="driver-management__label" htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="driver-management__input"
                placeholder="Enter phone number"
              />
            </div>

            <div className="driver-management__form-group">
              <label className="driver-management__label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="driver-management__input"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div className="driver-management__form-actions">
            <button type="submit" className="driver-management__btn driver-management__btn--submit">
              {form.id ? 'Update Driver' : 'Add Driver'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="driver-management__btn driver-management__btn--clear"
            >
              Clear
            </button>
          </div>
        </form>

        <h5 className="driver-management__subtitle">Driver List</h5>

        {drivers.length === 0 ? (
          <p className="driver-management__no-data">No drivers added yet.</p>
        ) : (
          <div className="driver-management__table-wrapper">
            <table className="driver-management__table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>License #</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.name}</td>
                    <td>{driver.licenseNumber}</td>
                    <td>{driver.phone}</td>
                    <td>{driver.email}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(driver)}
                        className="driver-management__btn driver-management__btn--edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="driver-management__btn driver-management__btn--delete"
                      >
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

export default DriverManagement;
