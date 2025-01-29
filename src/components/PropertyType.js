"use client";

import { useAppConfig } from "@/context/App";
import React, { useMemo } from "react";

const PropertyType = ({ filterFunctions, type = "passive" }) => {
  const { propertyTypes: options } = useAppConfig();
  const propertyTypes = useMemo(() => {
    return filterFunctions?.propertyTypes?.filter((el) => el != "all" && el != null && el != "null")
  }, [filterFunctions?.propertyTypes])
  return (
    <>
      <label className="custom_checkbox">
        All
        <input
          type="checkbox"
          checked={
            propertyTypes?.length === 0
          }
          onChange={(e) => {
            filterFunctions?.handlePropertyTypes(["all"], type);
          }}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <Label filterFunctions={filterFunctions} option={option} type={type} key={index} />
      ))}
    </>
  );
};

export default PropertyType;



const Label = ({ filterFunctions, option, type, index }) => {
  const isChecked = useMemo(() => filterFunctions?.propertyTypes?.map((el) => el?.toLowerCase())?.includes(option?.label?.toLowerCase()), [filterFunctions?.propertyTypes, option?.label])


  return <label className="custom_checkbox" key={index}>
    {option.label}
    <input
      type="checkbox"
      checked={isChecked}
      onChange={(e) => {
        filterFunctions?.handlePropertyTypes(option.label?.toLowerCase(), type);
      }}
    />
    <span className="checkmark" />
  </label>
}