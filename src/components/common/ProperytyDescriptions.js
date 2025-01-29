"use client";

import React, { useState } from "react";

const ProperytyDescriptions = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback to empty string if PropertyDescription is undefined or null
  const propertyDescription = data?.PropertyDescription || "";

  const firstPart = propertyDescription.substring(0, 200); // first 200 characters
  const secondPart = propertyDescription.substring(200); // the rest of the string

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // If description is empty or missing, show "No data available"
  if (!propertyDescription.trim()) {
    return <p className="text mb0">No data available</p>;
  }

  return (
    <>
      <p className="text mb0">{firstPart}</p>
      {secondPart && (
        <div className="agent-single-accordion">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <div
                id="flush-collapseOne"
                className={`accordion-collapse collapse ${isExpanded ? "show" : ""}`}
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body p-0">
                  <p className="text">{secondPart}</p>
                </div>
              </div>

              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button p-0 collapsed"
                  type="button"
                  onClick={toggleExpand}
                >
                  {isExpanded ? "Show less" : "Show more"}
                </button>
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProperytyDescriptions;
