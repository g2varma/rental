"use client";

import React from "react";

const MapViewActionBar = ({
  colStyle,
  setColStyle,
  pageNumber,
  sizeNumber,
  total,
  filterFunctions,
}) => {
  const sortOptions = [
    { label: "Relevance", value: "relevance", key: "rent_amount" }, // Default option
    { label: "Price Low", value: "asc", key: "rent_amount" },
    { label: "Price High", value: "desc", key: "rent_amount" },
  ];

  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            {(pageNumber - 1) * sizeNumber + 1}-
            {Math.min(pageNumber * sizeNumber, total)} of {total} results
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              style={{ minWidth: "120px" }}
              className="form-select"
              value={filterFunctions.currentSortingOption?.value || "relevance"}
              onChange={(e) => {
                const d = e?.target?.value;
                filterFunctions.handleSorting({
                  key: sortOptions.find((o) => o.value === d)?.key,
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
            className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${!colStyle ? "menuActive" : "#"
              } `}
            onClick={() => setColStyle(false)}
          >
            Grid
          </div>
          <div
            className={`pl15 d-none d-md-block cursor  ${colStyle ? "menuActive" : "#"
              }`}
            onClick={() => setColStyle(true)}
          >
            Map
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default MapViewActionBar;
