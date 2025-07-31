import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './styles/global.css'; // or correct relative path


const Drivers = () => {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Smith', licenseNumber: 'DL12345678', phone: '9876543210' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentDriver, setCurrentDriver] = useState({ name: '', licenseNumber: '', phone: '' });
  const [editingDriver, setEditingDriver] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setCurrentDriver({ name: '', licenseNumber: '', phone: '' });
    setEditingDriver(null);
  };

  const handleChange = (e) => {
    setCurrentDriver({ ...currentDriver, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateDriver = () => {
    if (editingDriver) {
      // Update driver
      const updatedDrivers = drivers.map(driver =>
        driver.id === editingDriver.id ? { ...editingDriver, ...currentDriver } : driver
      );
      setDrivers(updatedDrivers);
    } else {
      // Add new driver
      const newDriver = { ...currentDriver, id: Date.now() };
      setDrivers([...drivers, newDriver]);
    }
    handleClose();
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setCurrentDriver({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      phone: driver.phone,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  return (
    <div>
      
      <div className="driver-management">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Driver Management</h2>
        <Button variant="primary" onClick={handleShow}>+ Add Driver</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>License Number</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.phone}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(driver)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(driver.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {drivers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No drivers added yet.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingDriver ? 'Edit Driver' : 'Add New Driver'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentDriver.name}
                onChange={handleChange}
                placeholder="Enter driver name"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licenseNumber"
                value={currentDriver.licenseNumber}
                onChange={handleChange}
                placeholder="Enter license number"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={currentDriver.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleAddOrUpdateDriver}>
            {editingDriver ? 'Save Changes' : 'Add Driver'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    
  );
};

export default Drivers;
