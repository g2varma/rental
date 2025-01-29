"use client";

import AdvanceFilterModal from "@/components/common/advance-filter-two";
import ListingSidebar from "../sidebar";
import FeaturedListings from "./FeaturedListings";
import Pagination from "./Pagination";
import TopFilterBar from "./TopFilterBar";

export default function GridView({
  handleApplyFilter,
  sizeNumber,
  setColStyle,
  colStyle,
  filterFunctions,
  pageItems,
  pageNumber,
  setPageNumber,
  totalData,
}) {

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
              Listing Filter
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModalGrid"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal
              origin="grid"
              filterFunctions={filterFunctions}
              handleApplyFilter={handleApplyFilter}
            />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}

        <div className="row">
          <TopFilterBar
            colStyle={colStyle}
            setColStyle={setColStyle}
            filterFunctions={filterFunctions}
            type="active"
          />
        </div>
        {/* End TopFilterBar */}

        <div className="row">
          <FeaturedListings
            className={"col-sm-6 col-lg-4"}
            data={pageItems}
            listClassName={"listing-style1"}
          />
        </div>
        {/* End .row */}

        <div className="row">
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            sizeNumber={sizeNumber}
            total={totalData}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
