"use client";

import React, { useEffect, useState } from "react";

import GridView from "./GridView";
import MapView from "./MapView";
import Footer from "../default-footer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { areQueryStringsEqual, createQueryString } from "@/utils/lib";
import LoadingOverlay from "../common/Loader";
import dayjs from "dayjs";

const Wrapper = ({ heading, listings, total }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryStrings = searchParams.toString();

  const [loading, setLoading] = useState(null);

  const searchKey = decodeURIComponent(searchParams.get("key"));
  const pageQ = decodeURIComponent(searchParams.get("page"));
  const sizeQ = decodeURIComponent(searchParams.get("size"));
  const typeQ = decodeURIComponent(searchParams.get("type"));
  const priceLQ = decodeURIComponent(searchParams.get("priceL"));
  const priceHQ = decodeURIComponent(searchParams.get("priceH"));
  const bedroomsQ = decodeURIComponent(searchParams.get("bedrooms"));
  const bathroomsQ = decodeURIComponent(searchParams.get("bathrooms"));
  const locationQ = decodeURIComponent(searchParams.get("location"));
  const sqftLQ = decodeURIComponent(searchParams.get("sqftL"));
  const sqftHQ = decodeURIComponent(searchParams.get("sqftH"));
  const yearBuildLQ = decodeURIComponent(searchParams.get("yearBuildL"));
  const yearBuildHQ = decodeURIComponent(searchParams.get("yearBuildH"));
  const amenitiesQ = decodeURIComponent(searchParams.get("amenities"));

  const { replace } = useRouter();

  const [colStyle, setColStyle] = useState(false);
  const [pageNumber, setPageNumber] = useState(pageQ ?? 1);
  const [sizeNumber, setSizeNumber] = useState(sizeQ ?? 10);
  const [queryParams, setQueryParams] = useState({});

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squareFeet, setSquareFeet] = useState([]);
  const [yearBuild, setYearBuild] = useState([]);
  const [categories, setCategories] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState({
    key: "price",
    value: "relevance",
  });

  const resetFilter = () => {
    setPropertyTypes([]);
    setPriceRange([0, 20000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setSquareFeet([]);
    setYearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption({
      key: "price",
      value: "relevance",
    });
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });

    setQueryParams({})
    if (searchKey) {
      replace(`${pathname}?page=${pageQ}&size=${sizeQ}&key=${searchKey}`);
    } else {
      replace(`${pathname}?page=${pageQ}&size=${sizeQ}`);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handlePropertyTypes = (elm, type) => {
    const isArray = Array.isArray(elm);
    if (isArray) {
      const propData = elm?.filter((el) => el != "all" && el != null);
      setPropertyTypes(propData);
      if (propData?.length > 0) {
        setQueryParams({ ...queryParams, type: propData?.join(",") });
      } else {
        setQueryParams({ ...queryParams, type: null });
      }
      if (type == "active") {
        const search =
          propData?.length > 0
            ? createQueryString(searchParams, {
              type: propData?.join(","),
              page: 1,
            })
            : createQueryString(searchParams, {
              type: null,
              page: 1,
            });
        if (!areQueryStringsEqual(search, queryStrings)) {
          setLoading(dayjs().toISOString());
        }
        replace(`${pathname}?${search.toString()}`);
      }
    } else {
      if (elm == "all") {

        setPropertyTypes([]);
        setQueryParams({ ...queryParams, type: null });
        if (type == "active") {
          const search = createQueryString(searchParams, {
            type: null,
            page: 1,
          });
          if (!areQueryStringsEqual(search, queryStrings)) {
            setLoading(dayjs().toISOString());
          }
          replace(`${pathname}?${search.toString()}`);
        }
      } else {
        const propData = propertyTypes?.includes(elm)
          ? propertyTypes?.filter((el) => el != elm)
          : [...propertyTypes, elm];
        setPropertyTypes(propData);
        setQueryParams({ ...queryParams, type: propData?.join(",") });
        if (type == "active") {
          const search = createQueryString(searchParams, {
            type: propData?.join(","),
            page: 1,
          });
          if (!areQueryStringsEqual(search, queryStrings)) {
            setLoading(dayjs().toISOString());
          }
          replace(`${pathname}?${search.toString()}`);
        }
      }
    }
  };
  const handlePriceRange = (elm, type) => {
    const [priceL, priceH] = elm;
    setPriceRange(elm);
    setQueryParams({ ...queryParams, priceL: priceL, priceH: priceH });
    if (type == "active") {
      const search = createQueryString(searchParams, {
        priceL: priceL,
        priceH: priceH,
        page: 1,
      });
      if (!areQueryStringsEqual(search, queryStrings)) {
        setLoading(dayjs().toISOString());
      }
      replace(`${pathname}?${search.toString()}`);
    }
  };
  const handleBedrooms = (elm, type) => {
    setQueryParams({ ...queryParams, bedrooms: elm === 0 ? null : elm });
    if (type == "active") {
      const search = createQueryString(searchParams, {
        bedrooms: elm === 0 ? null : elm,
        page: 1,
      });
      if (!areQueryStringsEqual(search, queryStrings)) {
        setLoading(dayjs().toISOString());
      }
      replace(`${pathname}?${search.toString()}`);
    }
    setBedrooms(elm);
  };
  const handleBathrooms = (elm, type) => {
    setQueryParams({ ...queryParams, bathrooms: elm === 0 ? null : elm });
    if (type == "active") {
      const search = createQueryString(searchParams, {
        bathrooms: elm === 0 ? null : elm,
        page: 1,
      });
      if (!areQueryStringsEqual(search, queryStrings)) {
        setLoading(dayjs().toISOString());
      }
      replace(`${pathname}?${search.toString()}`);
    }
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
  const handleSorting = (elm) => {
    setCurrentSortingOption(elm);
    setQueryParams({
      ...queryParams,
      sort: elm.key,
      sortOrder: elm.value,
    });

    const search = createQueryString(searchParams, {
      sort: elm.key,
      sortOrder: elm.value,
      page: 1,
    });
    if (!areQueryStringsEqual(search, queryStrings)) {
      setLoading(dayjs().toISOString());
    }
    replace(`${pathname}?${search.toString()}`);
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
    handleSorting,
    currentSortingOption,
  };

  useEffect(() => {
    setPropertyTypes(
      typeQ?.split(",").filter((el) => el?.trim() !== "") === "null"
        ? []
        : typeQ?.split(",").filter((el) => el?.trim() !== "")
    );
    setPriceRange([
      priceLQ == "null" ? 0 : priceLQ,
      priceHQ == "null" ? 20000 : priceHQ,
    ]);
    setBedrooms(bedroomsQ == "null" ? 0 : bedroomsQ);
    setBathrooms(bathroomsQ == "null" ? 0 : bathroomsQ);
    setLocation(locationQ == "null" ? "All Cities" : locationQ);
    setSquareFeet([sqftLQ, sqftHQ]);
    setYearBuild([yearBuildLQ, yearBuildHQ]);
    setSizeNumber(sizeQ == "null" ? 10 : sizeQ);
    setPageNumber(pageQ == "null" ? 1 : pageQ);
    setCategories(amenitiesQ == "null" ? [] : amenitiesQ?.split(","));
  }, [
    typeQ,
    priceLQ,
    priceHQ,
    bedroomsQ,
    bathroomsQ,
    locationQ,
    sqftLQ,
    sqftHQ,
    yearBuildLQ,
    yearBuildHQ,
    pageQ,
    sizeQ,
    amenitiesQ,
  ]);

  useEffect(() => {
    const search = createQueryString(searchParams, {
      page: pageNumber,
      size: sizeNumber,
    });

    if (!areQueryStringsEqual(search, queryStrings)) {
      setLoading(dayjs().toISOString());
    }
    replace(`${pathname}?${search.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pathname, sizeNumber, searchParams]);

  useEffect(() => {
    const checkLoaderTime = () => {
      const currentTime = dayjs();
      const loadingTime = dayjs(loading);
      const elapsed = currentTime.diff(loadingTime);

      if (elapsed > 2000) {
        setLoading(null);
      } else {
        const remainingTime = 2000 - elapsed;
        setTimeout(() => setLoading(null), remainingTime);
      }
    };

    checkLoaderTime();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryStrings]);

  const handleApplyFilter = () => {
    const search = createQueryString(searchParams, { ...queryParams, page: 1 });
    if (!areQueryStringsEqual(search, queryStrings)) {
      setLoading(dayjs().toISOString());
    }
    replace(`${pathname}?${search.toString()}`);
  };

  useEffect(() => {
    const modal = document.querySelectorAll('.modal-backdrop');
    if (modal?.length > 0) {
      modal.forEach(el => {
        el.remove();
      });
    }
  }, []);
  if (colStyle)
    return (
      <>
        {/*         <LoadingOverlay loading={loading !== null}>Loading...</LoadingOverlay>
 */}
        <MapView
          totalData={total}
          setColStyle={setColStyle}
          colStyle={colStyle}
          heading={heading}
          handleApplyFilter={handleApplyFilter}
          filterFunctions={filterFunctions}
          pageItems={listings}
          pageNumber={pageNumber}
          sizeNumber={sizeNumber}
          setSizeNumber={setSizeNumber}
          setPageNumber={setPageNumber}
        />
      </>
    );
  return (
    <>
      <LoadingOverlay loading={loading !== null}>Loading...</LoadingOverlay>

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">{heading}</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">For Rent</a>
                </div>
                {/* <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}
      {/* Property Filtering */}
      <GridView
        handleApplyFilter={handleApplyFilter}
        totalData={total}
        setColStyle={setColStyle}
        colStyle={colStyle}
        filterFunctions={filterFunctions}
        pageItems={listings}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        sizeNumber={sizeNumber}
        setSizeNumber={setSizeNumber}
      />
      <section className="footer-style1">
        <Footer />
      </section>
      {/* Property Filtering */}
    </>
  );
};

export default Wrapper;
