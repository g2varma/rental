"use client";
import Slider from "rc-slider";
import { useState } from "react";

const PriceRange = ({ filterFunctions, type = "passive" }) => {
  const [minPrice, setMinPrice] = useState(filterFunctions?.priceRange[0] || 0);
  const [maxPrice, setMaxPrice] = useState(filterFunctions?.priceRange[1] || 20000);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);

  const handleInputBlur = (rangeType) => {
    if (rangeType === "min") {
      const value = Math.max(0, Math.min(tempMinPrice, maxPrice)); // Enforce non-negative and within maxPrice
      setMinPrice(value);
      setTempMinPrice(value);
      filterFunctions?.handlePriceRange([value, maxPrice], type);
    } else {
      const value = Math.max(minPrice, Math.min(tempMaxPrice, 20000)); // Enforce non-negative and within bounds
      setMaxPrice(value);
      setTempMaxPrice(value);
      filterFunctions?.handlePriceRange([minPrice, value], type);
    }
  };

  const handleSliderChange = (value) => {
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
    setTempMinPrice(value[0]);
    setTempMaxPrice(value[1]);
    filterFunctions?.handlePriceRange(value, type);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          max={20000}
          min={0}
          value={[minPrice, maxPrice]}
          onChange={handleSliderChange}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <input
            type="number"
            id="slider-range-value1"
            value={tempMinPrice}
            onChange={(e) => setTempMinPrice(Math.max(0, +e.target.value || 0))} // Prevent negative values
            onBlur={() => handleInputBlur("min")}
            className="form-control"
          />
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <input
            type="number"
            id="slider-range-value2"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(Math.max(0, +e.target.value || 0))} // Prevent negative values
            onBlur={() => handleInputBlur("max")}
            className="form-control"
          />
        </div>
      </div>
    </>
  );
};

export default PriceRange;
