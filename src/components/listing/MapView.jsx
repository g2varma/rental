"use client";

import MapViewTopFilterBar from "./MapViewTopFilterBar";

import AdvanceFilterModal from "@/components/common/advance-filter-two";
import FeaturedListings from "./FeaturedListings";
import ListingMap from "./ListingMap";
import Pagination from "./Pagination";
import MapViewActionBar from "./MapViewActionBar";
export default function MapView({
  handleApplyFilter,
  totalData,
  sizeNumber,
  setColStyle,
  colStyle,
  heading,
  filterFunctions,
  pageItems,
  pageNumber,
  setPageNumber,
}) {
  return (
    <>
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModalMap"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal
            origin="map"
            filterFunctions={filterFunctions}
            handleApplyFilter={handleApplyFilter}
          />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}

      {/* Property Filtering */}
      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">
            <div className="col-xl-6">
              <div
                className="half_map_area_content mt30"
                style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}
              >
                <div className="col-lg-12">
                  <div className="advance-search-list d-flex justify-content-between">
                    <div className="dropdown-lists">
                      <ul className="p-0 mb-0">
                        <MapViewTopFilterBar
                          filterFunctions={filterFunctions}
                          type="active"
                        />
                      </ul>
                    </div>
                  </div>
                </div>
                {/* End .col-12 */}

                <h4 className="mb-1">{heading}</h4>

                <div className="row align-items-center mb10">
                  <MapViewActionBar
                    colStyle={colStyle}
                    setColStyle={setColStyle}
                    pageNumber={pageNumber}
                    sizeNumber={sizeNumber}
                    total={totalData}
                    filterFunctions={filterFunctions}
                  />
                </div>
                <div className="row">
                  <FeaturedListings
                    className={"col-sm-12"}
                    data={pageItems}
                    listClassName={"listing-style1 listCustom listing-type"}
                  />
                </div>
                {/* End .row */}

                <div className="row text-center">
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    sizeNumber={sizeNumber}
                    total={totalData}
                  />
                </div>
                {/* End .row */}
              </div>
              {/* End .half_map_area_content */}
            </div>
            {/* End col-5 */}

            <div
              className="col-xl-6 overflow-hidden position-relative"
              style={{ height: "calc(100vh - 88px)" }}
            >
              <div className="half_map_area map-canvas half_style" style={{ height: "100%" }}>
                <ListingMap pageItems={pageItems} />
              </div>
            </div>
            {/* End col-7 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
