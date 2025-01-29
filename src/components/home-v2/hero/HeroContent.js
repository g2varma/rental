"use client";
import React, { useState } from "react";
import SelectDropdown from "./SelectDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import FilterWrapper from "./FilterWrapper";
import { createQueryString } from "@/utils/lib";

const HeroContent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState({});
  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setQueryParams({ ...queryParams, key: searchQuery });
  };
  const handleCategoryChange = (category) => {
    setQueryParams({ ...queryParams, type: category?.value });
  };
  const closeHeroModal = () => {
    const modalElement = document.getElementById('advanceSeachModalHero');
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    modalElement.setAttribute('aria-hidden', 'true');
    modalElement.removeAttribute('aria-modal');
  }
  const onSearch = () => {
    if (!queryParams?.key || queryParams?.key.trim("") === "") {
      return;
    }
    setLoading(true);
    closeHeroModal();
    const search = createQueryString(searchParams, { ...queryParams, page: 1 });
    router.push(`/search?${search.toString()}`);
  };

  return (
    <>
      <div
        className="advance-style2 mt80 mt0-md mb60 mx-auto"
        data-aos="fade-up"
      >
        {/* <ul className="nav nav-tabs p-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul> */}
        <div style={{ height: "80px" }}></div>
        <div className="tab-content">
          <div className="active tab-pane">
            <div className="advance-content-style2">
              <form
                className="row align-items-center justify-content-start justify-content-md-center"
                action={onSearch}
              >
                <div className="col-md-5 col-lg-6">
                  <div className="advance-search-field position-relative text-start bdrr1 bdrrn-sm bb1-sm">
                    <div className="form-search position-relative">
                      <div className="box-search">
                        <span className="icon flaticon-home-1" />
                        <input
                          onChange={handleSearchChange}
                          className="form-control "
                          type="text"
                          name="key"
                          placeholder="Search by address, city or postal code"
                          disabled={loading}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .col-md-6 */}

                <div className="col-md-3 col-lg-3 ps-md-0">
                  <div className="bdrr1 bdrrn-sm pe-0 pe-lg-3 bb1-sm">
                    <div className="bootselect-multiselect">
                      <SelectDropdown
                        disabled={loading}
                        handleCategoryChange={handleCategoryChange}
                      />
                    </div>
                  </div>
                </div>
                {/* End .col-md-3 */}

                <div className="col-md-4 col-lg-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      disabled={loading || queryParams?.key?.trim("") === ""}
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModalHero"
                      style={{
                        cursor: queryParams?.key?.trim("") === "" ? "not-allowed" : "pointer",
                        color: queryParams?.key?.trim("") === "" ? "lightgray" : "",
                      }}
                      title={queryParams?.key?.trim("") === "" ? "Please enter a keyword" : "Advanced Search"}
                    >
                      <span className="flaticon-settings" /> Advanced
                    </button>
                    <button
                      disabled={loading}
                      className="advance-search-icon ud-btn btn-thm ms-4"
                      type="submit"
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" />
                      ) : (
                        <span className="flaticon-search" />
                      )}
                    </button>
                  </div>
                </div>
                {/* End .col-md-64 */}
              </form>
            </div>
          </div>
        </div>
        {/* End tab-content */}
      </div>
      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModalHero"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <FilterWrapper
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            handleApplyFilter={onSearch}
          />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default HeroContent;
