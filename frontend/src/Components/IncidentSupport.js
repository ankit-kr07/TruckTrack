import React, { useState } from "react";
import "../styles/IncidentSupport.css";

const generateTicketID = () => {
  // Example: TICKET-20250525-001 (date + incremental)
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `TICKET-${datePart}-${randomPart}`;
};

const IncidentSupport = () => {
  const [incidentType, setIncidentType] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState("");
  const [pastIncidents, setPastIncidents] = useState([
    {
      id: generateTicketID(),
      date: new Date("2025-05-20T10:30:00"),
      type: "Brake Failure",
      priority: "High",
      status: "Closed",
      description: "Brakes were not responsive at low speed.",
      comments: "Replaced brake pads after incident.",
    },
    {
      id: generateTicketID(),
      date: new Date("2025-05-22T14:15:00"),
      type: "Engine Overheat",
      priority: "Medium",
      status: "In Progress",
      description: "Engine temperature rose above normal limits.",
      comments: "Coolant level checked and refilled.",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!incidentType.trim() || !description.trim()) {
      alert("Please fill in the required fields (Incident Type and Description).");
      return;
    }

    const newIncident = {
      id: generateTicketID(),
      date: new Date(),
      type: incidentType,
      priority,
      status,
      description,
      comments,
    };

    setPastIncidents([newIncident, ...pastIncidents]);
    clearForm();
  };

  const clearForm = () => {
    setIncidentType("");
    setPriority("Medium");
    setStatus("Open");
    setDescription("");
    setComments("");
  };

  return (
    <div className="incident-support-container">
      <div className="incident-support-card">
        <h2 className="incident-support-title">Incident Support Ticket</h2>

        <form className="incident-support-form" onSubmit={handleSubmit}>
          <label htmlFor="incidentType" className="form-label">
            Incident Type <span style={{ color: "#ff6666" }}>*</span>
          </label>
          <input
            type="text"
            id="incidentType"
            className="form-control"
            placeholder="Enter incident type"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            required
          />

          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            className="form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>

          <label htmlFor="description" className="form-label">
            Description <span style={{ color: "#ff6666" }}>*</span>
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Provide a detailed description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />

          <label htmlFor="comments" className="form-label">
            Comments (optional)
          </label>
          <textarea
            id="comments"
            className="form-control"
            placeholder="Additional comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
          />

          <div className="incident-support-buttons">
            <button type="submit" className="btn-primary">
              Submit Ticket
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="incident-support-past-incidents">
          <h3>Past Tickets</h3>
          {pastIncidents.length === 0 ? (
            <p>No past tickets recorded.</p>
          ) : (
            pastIncidents.map(
              ({ id, date, type, priority, status, description, comments }) => (
                <div key={id} className="past-incident-entry">
                  <strong>Ticket ID:</strong> {id} <br />
                  <strong>Date:</strong> {date.toLocaleString()} <br />
                  <strong>Type:</strong> {type} <br />
                  <strong>Priority:</strong>{" "}
                  <span
                    style={{
                      color:
                        priority === "High"
                          ? "#ff4d4d"
                          : priority === "Medium"
                          ? "#ffc04d"
                          : "#4dff88",
                    }}
                  >
                    {priority}
                  </span>{" "}
                  <br />
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        status === "Closed"
                          ? "#6c757d"
                          : status === "In Progress"
                          ? "#4da6ff"
                          : "#85e085",
                    }}
                  >
                    {status}
                  </span>
                  <ul>
                    <li>
                      <strong>Description:</strong> {description}
                    </li>
                    {comments && (
                      <li>
                        <strong>Comments:</strong> {comments}
                      </li>
                    )}
                  </ul>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentSupport;
