"use client";

import { useAppConfig } from "@/context/App";

const Amenities = ({ filterFunctions }) => {
  const { amenities = [] } = useAppConfig();

  return (
    <>
      {amenities.map((amenity, amenityIndex) => (
        <div className="col-sm-4" key={amenityIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              <label className="custom_checkbox">
                {amenity.label}
                <input
                  checked={filterFunctions?.categories.includes(amenity.label)}
                  onChange={() =>
                    filterFunctions?.handleCategories(amenity.label)
                  }
                  type="checkbox"
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities;
