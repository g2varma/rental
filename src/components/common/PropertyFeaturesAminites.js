import React from "react";

const PropertyFeaturesAminites = ({ data }) => {
  const features = data?.Features || [];

  // If there are no features, display a fallback message
  if (features.length === 0) {
    return <p className="text mb10">No data available</p>;
  }

  return (
    <>
      <div
        className="pd-list"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "10px",
        }}
      >
        {features.map((item, index) => (
          <p key={index} className="text mb10">
            <i className="fas fa-circle fz6 align-middle pe-2" />
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

export default PropertyFeaturesAminites;
