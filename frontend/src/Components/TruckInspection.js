import React, { useState } from "react";
import "../styles/TruckInspection.css";

const TruckInspection = () => {
  const [inspectionData, setInspectionData] = useState({
    brakes: false,
    lights: false,
    tires: false,
    engine: false,
    mirrors: false,
    windshield: false,
    horn: false,
    wipers: false,
    comments: "",
  });

  const [images, setImages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setInspectionData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCommentChange = (e) => {
    setInspectionData((prevData) => ({
      ...prevData,
      comments: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    const newEntry = { ...inspectionData, images, timestamp };
    setHistory((prevHistory) => [newEntry, ...prevHistory]);
    setInspectionData({
      brakes: false,
      lights: false,
      tires: false,
      engine: false,
      mirrors: false,
      windshield: false,
      horn: false,
      wipers: false,
      comments: "",
    });
    setImages([]);
  };

  const handleClearForm = () => {
    setInspectionData({
      brakes: false,
      lights: false,
      tires: false,
      engine: false,
      mirrors: false,
      windshield: false,
      horn: false,
      wipers: false,
      comments: "",
    });
    setImages([]);
  };

  return (
    <div className="truck-inspection-container">
      <div className="truck-inspection-card">
        <h4 className="truck-inspection-title">Truck Inspection</h4>
        <form onSubmit={handleSubmit}>
          <div className="truck-inspection-checklist row">
            {[
              "brakes",
              "lights",
              "tires",
              "engine",
              "mirrors",
              "windshield",
              "horn",
              "wipers",
            ].map((item) => (
              <div className="col-md-3 col-sm-6" key={item}>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={item}
                    name={item}
                    checked={inspectionData[item]}
                    onChange={handleToggleChange}
                  />
                  <label className="form-check-label" htmlFor={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label htmlFor="comments" className="form-label">
              Additional Comments
            </label>
            <textarea
              className="form-control"
              id="comments"
              rows="3"
              value={inspectionData.comments}
              onChange={handleCommentChange}
              placeholder="Enter any issues or notes here..."
            ></textarea>
          </div>

          <div className="mt-3">
            <label htmlFor="images" className="form-label">
              Upload Photos (optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {images.length > 0 && (
              <div className="truck-inspection-image-preview">
                {images.map((img, i) => (
                  <img key={i} src={img} alt={`Preview ${i}`} />
                ))}
              </div>
            )}
          </div>

          <div className="truck-inspection-buttons">
            <button type="submit" className="btn btn-primary">
              Submit Inspection
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearForm}
            >
              Clear Form
            </button>
          </div>
        </form>

        {history.length > 0 && (
          <div className="mt-4">
            <h6>Past Inspections</h6>
            {history.map((entry, idx) => (
              <div key={idx} className="past-inspection-entry">
                <p>
                  <strong>Timestamp:</strong> {entry.timestamp}
                </p>
                <ul>
                  {Object.entries(entry)
                    .filter(
                      ([key, val]) =>
                        typeof val === "boolean" && val === true
                    )
                    .map(([key]) => (
                      <li key={key}>{key}</li>
                    ))}
                </ul>
                {entry.comments && (
                  <p>
                    <strong>Comments:</strong> {entry.comments}
                  </p>
                )}
                {entry.images && entry.images.length > 0 && (
                  <div className="truck-inspection-image-preview">
                    {entry.images.map((img, i) => (
                      <img key={i} src={img} alt={`History Img ${i}`} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TruckInspection;
