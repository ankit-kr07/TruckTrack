import React, { useState, useEffect } from 'react';
import '../styles/FuelLogs.css';

const defaultForm = {
  id: null,
  date: new Date().toISOString().slice(0, 16),
  odometer: '',
  quantity: '',
  cost: '',
  location: '',
  photo: null,
};

const FuelLog = () => {
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('fuelLogs')) || []);
  const [form, setForm] = useState(defaultForm);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    localStorage.setItem('fuelLogs', JSON.stringify(logs));
  }, [logs]);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('Image is too large (max 2MB).');
        return;
      }
      const base64 = await toBase64(file);
      setForm((prev) => ({ ...prev, photo: base64 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedLogs = form.id
      ? logs.map((log) => (log.id === form.id ? form : log))
      : [...logs, { ...form, id: Date.now() }];

    setLogs(updatedLogs);
    setForm(defaultForm);
  };

  const handleEdit = (log) => setForm(log);
  const handleDelete = (id) => setLogs((prev) => prev.filter((log) => log.id !== id));

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fuel_logs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const header = 'Date,Odometer,Fuel (L),Cost,Location\n';
    const rows = logs.map(
      (log) =>
        `${new Date(log.date).toLocaleString()},${log.odometer},${log.quantity},${log.cost},${log.location}`
    );
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fuel_logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedLogs = JSON.parse(event.target.result);
        if (Array.isArray(importedLogs)) {
          setLogs((prev) => [...prev, ...importedLogs]);
          alert('Logs imported successfully.');
        } else {
          alert('Invalid file format.');
        }
      } catch {
        alert('Failed to parse file.');
      }
    };
    reader.readAsText(file);
  };

  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalFuel = logs.reduce((sum, log) => sum + Number(log.quantity), 0);
  const totalCost = logs.reduce((sum, log) => sum + Number(log.cost), 0);

  return (
    <div className="fuel-container ">
     
        <div className=" card shadow card-body fuel-log-card">
          <h3 className="mb-3 fuel-log-title">Fuel Log</h3>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row g-3">
              <div className="col-md-4 col-sm-6">
                <label className="form-label">Date & Time</label>
                <input
                  type="datetime-local"
                  id="comments"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4 col-sm-6">
                <label className="form-label">Odometer (km)</label>
                <input
                  type="number"
                  name="odometer"
                  value={form.odometer}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-2 col-sm-6">
                <label className="form-label">Fuel (L)</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-2 col-sm-6">
                <label className="form-label">Cost (₹)</label>
                <input
                  type="number"
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Upload Receipt (optional)</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className="form-control"
                  accept="image/*"
                />
              </div>

              <div className="col-12 ">
                <button type="submit" className="btn fuel-btn me-2 fuel-log-buttons">
                  {form.id ? 'Update Log' : 'Add Log'}
                </button>
                <button
                  type="button"
                  onClick={() => setForm(defaultForm)}
                  className="btn  me-2 fuel-log-buttons"
                >
                  Clear
                </button>
                <button type="button" onClick={exportJSON} className="btn  me-2 fuel-log-buttons">
                  Export JSON
                </button>
                <button type="button" onClick={exportCSV} className="btn fuel-btn me-2 fuel-log-buttons">
                  Export CSV
                </button>
                <label className="btn fuel-btn mb-0 fuel-log-buttons" style={{ cursor: 'pointer' }}>
                  Import JSON
                  <input type="file" accept=".json" hidden onChange={importJSON} />
                </label>
              </div>
            </div>
          </form>

          <h5>Previous Logs</h5>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle fuel-log-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Odometer</th>
                  <th>Fuel (L)</th>
                  <th>Cost</th>
                  <th>Location</th>
                  <th>Receipt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedLogs.length > 0 ? (
                  sortedLogs.map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.date).toLocaleString()}</td>
                      <td>{log.odometer}</td>
                      <td>{log.quantity}</td>
                      <td>₹{log.cost}</td>
                      <td>{log.location}</td>
                      <td>
                        {log.photo ? (
                          <img
                            src={log.photo}
                            alt="Receipt"
                            style={{ width: '60px', cursor: 'pointer' }}
                            onClick={() => setModalImage(log.photo)}
                          />
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(log)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(log.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No logs yet.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th>—</th>
                  <th>{totalFuel.toFixed(2)} L</th>
                  <th>₹{totalCost.toFixed(2)}</th>
                  <th colSpan="3">—</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      

      {/* Modal for viewing receipt */}
      {modalImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          onClick={() => setModalImage(null)}
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Receipt</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalImage(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={modalImage}
                  alt="Receipt"
                  style={{ width: '100%', borderRadius: '6px' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelLog;
