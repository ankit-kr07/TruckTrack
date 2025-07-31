import React, { useState, useEffect } from 'react';
import '../styles/BreakTracker.css'; // Import the external CSS file

const BREAKS_KEY = 'breaks';

const loadBreaks = () => {
  const saved = localStorage.getItem(BREAKS_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveBreaks = (breaks) => {
  localStorage.setItem(BREAKS_KEY, JSON.stringify(breaks));
};

const BreakTracker = () => {
  const [breaks, setBreaks] = useState(loadBreaks);
  const [currentBreak, setCurrentBreak] = useState(null);

  useEffect(() => {
    saveBreaks(breaks);
  }, [breaks]);

  const startBreak = () => {
    if (currentBreak) {
      alert('You already started a break.');
      return;
    }
    setCurrentBreak(new Date().toISOString());
  };

  const endBreak = () => {
    if (!currentBreak) {
      alert('No break in progress.');
      return;
    }
    const endTime = new Date();
    const startTime = new Date(currentBreak);
    const durationMs = endTime - startTime;
    const durationMinutes = Math.round(durationMs / 60000);

    const newBreak = {
      id: Date.now(),
      date: startTime.toLocaleDateString(),
      start: startTime.toLocaleTimeString(),
      end: endTime.toLocaleTimeString(),
      duration: durationMinutes,
    };

    setBreaks([...breaks, newBreak]);
    setCurrentBreak(null);
  };

  const deleteBreak = (id) => {
    if (window.confirm('Delete this break record?')) {
      setBreaks(breaks.filter(b => b.id !== id));
    }
  };

  return (
    <div className="break-tracker-page">
      <div className="container mt-4">
        <div className="card p-4 shadow break-tracker-card">
          <h2>Break Tracker</h2>

          <div className="mb-3">
            {!currentBreak ? (
              <button className="btn btn-dark" onClick={startBreak}>
                Start Break
              </button>
            ) : (
              <button className="btn btn-dark" onClick={endBreak}>
                End Break
              </button>
            )}
          </div>

          <h3>Break History</h3>
          {breaks.length === 0 ? (
            <p>No breaks recorded.</p>
          ) : (
            <table className="table table-bordered table-custom">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration (minutes)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {breaks.map((b) => (
                  <tr key={b.id}>
                    <td>{b.date}</td>
                    <td>{b.start}</td>
                    <td>{b.end}</td>
                    <td>{b.duration}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-dark"
                        onClick={() => deleteBreak(b.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakTracker;
