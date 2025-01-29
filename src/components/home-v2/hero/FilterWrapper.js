"use client";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import { useState } from "react";

const FilterWrapper = ({ queryParams, setQueryParams, handleApplyFilter }) => {
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squareFeet, setSquareFeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  const resetFilter = () => {
    setPropertyTypes([]);
    setPriceRange([0, 20000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setSquareFeet([]);
    setYearBuild([0, 2050]);
    setCategories([]);
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
    replace(`${pathname}`);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handlePropertyTypes = (elm) => {
    const isArray = Array.isArray(elm);
    if (isArray) {
      const propData = elm?.filter((el) => el != "all" && el != null);
      setPropertyTypes(propData);
      setQueryParams({ ...queryParams, type: propData?.join(",") });
    } else {
      if (elm == "all") {
        setPropertyTypes([]);
        setQueryParams({ ...queryParams, type: null });
      } else {
        const propData = propertyTypes?.includes(elm)
          ? propertyTypes?.filter((el) => el != elm)
          : [...propertyTypes, elm];
        setPropertyTypes(propData);
        setQueryParams({ ...queryParams, type: propData?.join(",") });
      }
    }
  };
  const handlePriceRange = (elm) => {
    const [priceL, priceH] = elm;
    setQueryParams({ ...queryParams, priceL: priceL, priceH: priceH });
    setPriceRange(elm);
  };
  const handleBedrooms = (elm) => {
    setQueryParams({ ...queryParams, bedrooms: elm === 0 ? null : elm });
    setBedrooms(elm);
  };
  const handleBathrooms = (elm) => {
    setQueryParams({ ...queryParams, bathrooms: elm === 0 ? null : elm });
    setBathrooms(elm);
  };
  const handleLocation = (elm) => {
    setQueryParams({
      ...queryParams,
      location: elm === "All Cities" ? null : elm,
    });
    setLocation(elm);
  };
  const handleSquareFeet = (elm) => {
    const [sqftL, sqftH] = elm;
    setQueryParams({
      ...queryParams,
      sqftL: sqftL == 0 ? null : sqftL,
      sqftH: sqftH == 0 ? null : sqftH,
    });
    setSquareFeet(elm);
  };
  const handleYearBuild = (elm) => {
    const [yearBuildL, yearBuildH] = elm;
    setQueryParams({
      ...queryParams,
      yearBuildL: yearBuildL == 0 ? null : yearBuildL,
      yearBuildH: yearBuildH == 0 ? null : yearBuildH,
    });
    setYearBuild(elm);
  };
  const handleCategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
      setQueryParams({ ...queryParams, amenities: null });
    } else {
      const pre = categories?.includes(elm)
        ? categories?.filter((el) => el != elm)
        : [...categories, elm];
      setCategories(pre);
      setQueryParams({ ...queryParams, amenities: pre?.join(",") });
    }
  };
  const filterFunctions = {
    handlePropertyTypes,
    handlePriceRange,
    handleBedrooms,
    handleBathrooms,
    handleLocation,
    handleSquareFeet,
    handleYearBuild,
    handleCategories,
    priceRange,
    propertyTypes,
    resetFilter,
    bedrooms,
    bathrooms,
    location,
    squareFeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };

  return (
    <AdvanceFilterModal
      origin="home"
      filterFunctions={filterFunctions}
      handleApplyFilter={handleApplyFilter}
    />
  );
};

export default FilterWrapper;
