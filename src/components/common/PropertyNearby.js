"use client";

import React from "react";

// Map DistanceType to Icons
const distanceIcons = {
  WALK: "fas fa-walking",
  CAR: "fas fa-car",
  TRANSIT: "fas fa-subway",
  CYCLE: "fas fa-bicycle",
};

const PropertyNearby = ({ data }) => {
  // Extract neighborhoods from data
  const neighborhoods = data?.Neighborhoods || [];

  return (
    <div className="col-md-12">
      {neighborhoods.length > 0 ? (
        <div className="row g-3">
          {neighborhoods.map((neighborhood, index) => (
            <div key={index} className="col-md-6">
              <div
                className="d-flex align-items-center justify-content-between"
                style={{
                  padding: "15px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div>
                  <p className="fw600 dark-color mb-1">{neighborhood.Name}</p>
                  <p className="text-muted mb-0">
                    {neighborhood.DistanceMinutes} min
                  </p>
                </div>
                <div>
                  <i
                    className={`${distanceIcons[neighborhood.DistanceType]}`}
                    style={{ fontSize: "20px", color: "#555" }}
                    title={neighborhood.DistanceType}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No data available</p>
      )}
    </div>
  );
};

export default PropertyNearby;
