"use client";
import Select from "react-select";
import Bedroom from "@/components/Bedroom";
import Bathroom from "@/components/Bathroom";
import Amenities from "./Amenities";
import PriceRange from "@/components/PriceRange";
import YearBuilt from "@/components/YearBuilt";
import { useAppConfig } from "@/context/App";
import LoadingOverlay from "@/components/common/Loader";
import { useState } from "react";

const AdvanceFilterModal = ({ filterFunctions, handleApplyFilter, origin }) => {
  const { propertyTypes: catOptions, availableLocations: locationOptions } =
    useAppConfig();

  const [loading, setLoading] = useState(false);

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

  const handleSearchClick = async () => {
    setLoading(true); // Start the spinner
    await handleApplyFilter(); // Call the search function 
    setLoading(false); // Stop the spinner once done
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        {loading && <LoadingOverlay loading={true} />} {/* Display spinner */}

        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        {/* End modal-header */}

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          {origin !== "home" && (
            <div className="row">
              <div className="col-sm-12">
                <div className="widget-wrapper">
                  <h6 className="list-title">Type</h6>
                  <div className="form-style2 input-group">
                    <Select
                      value={
                        filterFunctions?.propertyTypes.length === 0
                          ? []
                          : catOptions.filter((elm) =>
                            filterFunctions?.propertyTypes.includes(elm?.value)
                          )
                      }
                      name="colors"
                      isMulti
                      options={[{ label: "All", value: "all" }, ...catOptions]}
                      styles={customStyles}
                      placeholder="All"
                      onChange={(selectedOptions) => {
                        // Check if "All" is selected
                        const isAllSelected = selectedOptions.some(
                          (option) => option.value === "all"
                        );

                        if (isAllSelected) {
                          // Clear all filters and pass an empty value
                          filterFunctions?.handlePropertyTypes([]);
                        } else {
                          // Pass selected options excluding "All"
                          filterFunctions?.handlePropertyTypes(
                            selectedOptions
                              .filter((option) => option.value !== "all") // Exclude "All"
                              .map((el) => el.value.toLowerCase())
                          );
                        }
                      }}
                      className="select-custom"
                      classNamePrefix="select"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}




          {/* End .row */}

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} refComponent={"advance"} />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} refComponent={"advance"} />
                </div>
              </div>
            </div>

            {/* End .col-md-6 */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  <Select
                    placeholder="All Cities"
                    name="colors"
                    styles={customStyles}
                    options={[
                      { value: "", label: "All" }, // Add the "All" option
                      ...locationOptions,
                    ]}
                    className="select-custom filterSelect"
                    // Set the value of the select to the current location filter
                    value={[
                      { value: "", label: "All Cities" },
                      ...locationOptions,
                    ].find((elm) => elm.value === filterFunctions?.location) || null}
                    classNamePrefix="select"
                    // Handle the change by updating the filter state
                    onChange={(e) => filterFunctions?.handleLocation(e?.value || "")}
                    required
                  />
                </div>
              </div>
            </div>
          </div>



          <div className="row">
            {/* <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Location</h6>
                <div className="form-style2 input-group">
                  <Select
                    placeholder="All Cities"
                    name="colors"
                    styles={customStyles}
                    options={locationOptions}
                    className="select-custom filterSelect"
                    value={catOptions?.find((elm) => filterFunctions?.location === elm?.value) || null}

                    classNamePrefix="select"
                    onChange={(e) => filterFunctions?.handleLocation(e.value)}
                    required
                  />
                </div>
              </div>
            </div> */}
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Year Built</h6>
                <div className="d-flex">
                  <YearBuilt filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Square Feet</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) => filterFunctions?.handleSquareFeet([
                          e.target.value,
                          document.getElementById("maxFeet1").value / 1,
                        ])

                        }
                        onBlur={(e) => {
                          if (e.target.value < 0 && e.target.value !== "") e.target.value = 0;
                          else if (e.target.value > 100000 && e.target.value !== "") e.target.value = 100000;
                        }}
                        min={0}
                        max={100000}
                        placeholder="Min."
                        id="minFeet1"
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control filterInput"
                        onChange={(e) =>
                          filterFunctions?.handleSquareFeet([
                            document.getElementById("minFeet1").value / 1,
                            e.target.value,
                          ])
                        }
                        onBlur={(e) => {
                          if (e.target.value < 1 && e.target.value !== "") e.target.value = 1;
                          else if (e.target.value > 100000 && e.target.value !== "") e.target.value = 100000;
                        }}
                        min={1}
                        placeholder="Max"
                        max={100000}
                        id="maxFeet1"

                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper mb0">
                <h6 className="list-title mb10">Amenities</h6>
              </div>
            </div>
            <Amenities filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End modal body */}

        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              type="submit"
              className="ud-btn btn-thm"
              onClick={handleSearchClick}
              data-bs-dismiss="modal" // This closes the modal
            >
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
        {/* End modal-footer */}
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
