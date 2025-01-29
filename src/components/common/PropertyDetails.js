import React from "react";

// Helper function to format numbers with commas
const formatNumber = (num) => {
  if (num == null || isNaN(num)) return num; // Return as-is if it's not a valid number
  return new Intl.NumberFormat().format(num); // Format number with commas
};

const PropertyDetails = ({ data }) => {
  const columns = [
    [
      {
        label: "Property ID",
        value: data?.PropertyUnitTypeListingId,
      },
      {
        label: "Price",
        value: data?.RentAmount != null
          ? `$${formatNumber(data?.RentAmount)}`
          : "Contact", // Show "Contact" if RentAmount is null
      },
      {
        label: "Property Size",
        value: `${formatNumber(data?.UnitTypeSizeInSqFt ?? 0)} Sq Ft`,
      },
      {
        label: "Bathrooms",
        value: data?.WashRoom,
      },
      {
        label: "Bedrooms",
        value: data?.BedRoom,
      },
    ],
    [
      {
        label: "Garage",
        value: "0",
      },
      {
        label: "Garage Size",
        value: ``,
      },
      {
        label: "Year Built",
        value: data?.YearBuilt ?? "2024",
      },
      {
        label: "Property Type",
        value: data?.PropertyType,
      },
      {
        label: "Property Status",
        value: "For Rent",
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${columnIndex === 1 ? " offset-xl-2" : ""
            }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
