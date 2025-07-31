import React, { useState } from 'react';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import '../styles/DailyLogs.css'; // import the new styles
import SupportChat from '../Components/SupportChat';  // adjust the path if needed

const DailyLogs = () => {
  const driverId = '1234';
  const [showChat, setShowChat] = useState(false);
  const [logs, setLogs] = useState([
    {
      id: 1,
      date: '2025-05-22',
      driver: 'John Smith',
      startTime: '08:00',
      endTime: '16:00',
      distance: 350,
      notes: 'No issues during the trip.',
    },
    // add more logs here or load dynamically
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newLog, setNewLog] = useState({
    date: '',
    driver: '',
    startTime: '',
    endTime: '',
    distance: '',
    notes: '',
  });

  const [editingLog, setEditingLog] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewLog({ date: '', driver: '', startTime: '', endTime: '', distance: '', notes: '' });
    setEditingLog(null);
  };

  const handleChange = (e) => {
    setNewLog({ ...newLog, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateLog = () => {
    if (editingLog) {
      const updatedLogs = logs.map(log =>
        log.id === editingLog.id ? { ...editingLog, ...newLog } : log
      );
      setLogs(updatedLogs);
    } else {
      const newEntry = { ...newLog, id: Date.now() };
      setLogs([...logs, newEntry]);
    }
    handleClose();
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setNewLog({
      date: log.date,
      driver: log.driver,
      startTime: log.startTime,
      endTime: log.endTime,
      distance: log.distance,
      notes: log.notes,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  const filteredLogs = logs.filter(log =>
    log.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dailylogs-container">
      <div className="dailylogs-card">
        <div className="dailylogs-header d-flex justify-content-between align-items-center mb-4">
          <h2 className="dailylogs-title">Daily Logs</h2>
          <Button variant="primary" onClick={handleShow}>+ Add Log</Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Search by driver name..."
          className="mb-3 dailylogs-search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Table striped bordered hover responsive className="dailylogs-table">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Driver</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Distance (km)</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.length > 0 ? (
              currentLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.driver}</td>
                  <td>{log.startTime}</td>
                  <td>{log.endTime}</td>
                  <td>{log.distance}</td>
                  <td>{log.notes}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(log)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(log.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No logs found.</td>
              </tr>
            )}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <Pagination className="dailylogs-pagination">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === currentPage}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}
          </Pagination>
        )}

        <Modal show={showModal} onHide={handleClose} className="dailylogs-modal">
          <Modal.Header closeButton>
            <Modal.Title>{editingLog ? 'Edit Log' : 'Add New Log'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newLog.date}
                  onChange={handleChange}
                  className="dailylogs-input"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Driver Name</Form.Label>
                <Form.Control
                  type="text"
                  name="driver"
                  value={newLog.driver}
                  onChange={handleChange}
                  className="dailylogs-input"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={newLog.startTime}
                  onChange={handleChange}
                  className="dailylogs-input"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={newLog.endTime}
                  onChange={handleChange}
                  className="dailylogs-input"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Distance (km)</Form.Label>
                <Form.Control
                  type="number"
                  name="distance"
                  value={newLog.distance}
                  onChange={handleChange}
                  className="dailylogs-input"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="notes"
                  value={newLog.notes}
                  onChange={handleChange}
                  className="dailylogs-textarea"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleAddOrUpdateLog}>
              {editingLog ? 'Save Changes' : 'Add Log'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Toggle Support Chat Section */}
<div style={{ marginTop: '2rem' }}>
  <Button
    variant={showChat ? 'danger' : 'success'}
    onClick={() => setShowChat(!showChat)}
    className="mb-3"
  >
    {showChat ? '❌ Close Chat' : '💬 Chat with Support'}
  </Button>

  {showChat && (
    <div>
      <h4>Support Chat</h4>
      <SupportChat driverId={driverId} />
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default DailyLogs;
