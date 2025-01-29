import React from "react";

const OverView = ({ data }) => {
  // Use a fallback empty object if `data` is null or undefined
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Unit",
      value: data?.BedRoom ?? "N/A", // Safely access BedRoom and fallback to "N/A"
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: data?.WashRoom ?? "N/A", // Safely access WashRoom and fallback to "N/A"
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: data?.YearBuilt ?? "N/A", // Safely access yearBuild and fallback to 2024
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value:
        data?.UnitTypeSizeInSqFt != null
          ? new Intl.NumberFormat().format(data.UnitTypeSizeInSqFt)
          : "0", // Format UnitTypeSizeInSqFt or fallback to 0
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: data?.PropertySubType ?? "N/A", // Safely access PropertySubType and fallback to "N/A"
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-md-4 ${index === overviewData.length - 1 ? "col-xl-3" : "col-xl-2"
            }`}
        >
          <div className="overview-element mb30 d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
