"use client";

import React from "react";
import PropertyType from "@/components/PropertyType";
import Bedroom from "@/components/Bedroom";
import Bathroom from "@/components/Bathroom";
import PriceRange from "@/components/PriceRange";

const TopFilterBar = ({ filterFunctions, colStyle, setColStyle, type }) => {
  const sortOptions = [
    { label: "Relevance", value: "relevance", key: "rent_amount" }, // Default option
    { label: "Price Low", value: "asc", key: "rent_amount" },
    { label: "Price High", value: "desc", key: "rent_amount" },
  ];

  return (
    <>
      <div className="col-xl-9">
        <div className="dropdown-lists">
          <ul className="p-0 text-center text-xl-start d-flex flex-wrap">
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Property Type <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu" style={{ position: "fixed", maxHeight: "300px", overflowY: "auto" }}>
                <div className="widget-wrapper mb0 pl20">
                  <h6 className="list-title">Property Type</h6>
                  <div className="checkbox-style1">
                    <PropertyType
                      filterFunctions={filterFunctions}
                      type={type}
                    />
                  </div>
                </div>
                {/* <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Done
                  </button>
                </div> */}
              </div>
            </li>
            {/* End li Property Type */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Price <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper mb0 pl20 pr20">
                  <h6 className="list-title">Price Range</h6>
                  {/* Range Slider Desktop Version */}
                  <div className="range-slider-style1">
                    <PriceRange filterFunctions={filterFunctions} type={type} />
                  </div>
                </div>
                {/* <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div> */}
              </div>
            </li>
            {/* End li Price */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Beds / Baths <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd4 pb20">
                <div className="widget-wrapper pl20 pr20">
                  <h6 className="list-title">Bedrooms</h6>
                  <div className="d-flex">
                    <Bedroom filterFunctions={filterFunctions} type={type} refComponent={"top"} />
                  </div>
                </div>

                <div className="widget-wrapper mb0 pl20 pr20">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions} type={type} refComponent={"top"} />
                  </div>
                </div>
                {/* <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn4"
                  >
                    Done
                  </button>
                </div> */}
              </div>
            </li>
            {/* End bed and bathroom check */}

            <li className="list-inline-item">
              {/* Advance Features modal trigger */}
              <button
                type="button"
                className="open-btn mb15"
                data-bs-toggle="modal"
                data-bs-target="#advanceSeachModalGrid"
              >
                <i className="flaticon-settings me-2" /> More Filter
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col-9 */}

      <div className="col-xl-3">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              style={{ minWidth: "120px" }}
              className="form-select"
              value={filterFunctions.currentSortingOption?.value || "relevance"}
              onChange={(e) => {
                const d = e?.target?.value;
                const selectedOption = sortOptions.find((o) => o.value === d);

                filterFunctions.handleSorting({
                  key: selectedOption?.key, // Key is null for relevance
                  value: d,
                });
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`pl15 pr15 bdrl1 bdrr1 cursor ${!colStyle ? "menuActive" : "#"
              } `}
            onClick={() => setColStyle(false)}
          >
            Grid
          </div>
          <div
            className={`pl15 cursor ${colStyle ? "menuActive" : "#"
              }`}
            onClick={() => setColStyle(true)}
          >
            Map
          </div>
        </div>
      </div>
      {/* End .col-3 */}
    </>
  );
};

export default TopFilterBar;
