"use client";
import { useAppConfig } from "@/context/App";
import Select from "react-select";

const SelectDropdown = ({ handleCategoryChange, disabled }) => {
  const { propertyTypes: catOptions } = useAppConfig();

  // Add "All" as the first option if not already present
  const optionsWithAll = [
    { label: "All", value: "all" },
    ...catOptions, // Spread existing categories after "All"
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
            ? "#eb675312"
            : isFocused
              ? "#eb675312"
              : undefined,
      };
    },
  };

  return (
    <>
      <Select
        onChange={handleCategoryChange}
        defaultValue={optionsWithAll[0]} // Set "All" as the default value
        name="colors"
        options={optionsWithAll}
        styles={customStyles}
        className="text-start select-borderless"
        classNamePrefix="select"
        required
        isSearchable={false}
        disabled={disabled}
      />
    </>
  );
};

export default SelectDropdown;
