// "use client";
import { AUTH_GET } from "@/action";
import DefaultHeader from "@/components/DefaultHeader";
import FloorPlans from "@/components/common/FloorPlans";
import PropertyAddress from "@/components/common/PropertyAddress";
import PropertyDetails from "@/components/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/common/PropertyFeaturesAminites";
import PropertyNearby from "@/components/common/PropertyNearby";
import PropertyVideo from "@/components/common/PropertyVideo";
import ProperytyDescriptions from "@/components/common/ProperytyDescriptions";
import VirtualTour360 from "@/components/common/VirtualTour360";
import InfoWithForm from "@/components/common/more-info";
import Footer from "@/components/default-footer";
import MobileMenu from "@/components/mobile-menu";
import ContactWithAgent from "@/components/single-v2/ContactWithAgent";
import OverView from "@/components/single-v2/OverView";
import PropertyGallery from "@/components/single-v2/PropertyGallery";
import PropertyHeader from "@/components/single-v2/PropertyHeader";
import ScheduleForm from "@/components/single-v2/ScheduleForm";
import { Suspense } from "react";
import LoadingOverlay from "@/components/common/Loader";;
import convertToPascalCase from "@/utils/camelCase";  // Add PascalCase converter
import CalendarSchedular from "@/components/single-v2/CalendarSchedular";
import FeaturedListings from "@/components/listing/FeaturedListings";
import DiscoverListings from "@/components/listing/DiscoverListings";

export const metadata = {
  title: "MiPPRental | Find your next rental",
};

// Function to get property details from the API
const getPropertyDetails = async (id) => {
  try {
    const propertyDetailsRes = await AUTH_GET(`/v2/internal/listing/unit/${id}`);
    // Convert the data keys to PascalCase before returning
    return convertToPascalCase(propertyDetailsRes?.data || {});
  } catch (error) {
    console.error("Error fetching property details:", error);
    return null;  // Return null if there’s an error
  }
};

const getFeaturedListings = async (propertySubType) => {
  try {
    // Provide a default value for propertySubType if it is null or undefined
    const validSubType = propertySubType || "apartment"; // Replace "DefaultSubType" with a meaningful default if needed

    // Construct the API query string dynamically using the validated propertySubType
    const query = `/v2/internal/listing?filter=property_type:${encodeURIComponent(validSubType)}&sort=property_id&sortOrder=asc&pageNumber=1&pageSize=3`;

    // Fetch the data from the API
    const listingRes = await AUTH_GET(query);

    // Access the `properties` array from the response
    const rawProperties = listingRes?.properties || [];

    // Apply PascalCase conversion to the properties
    const formattedProperties = rawProperties.map(convertToPascalCase);

    // Return the formatted properties
    return formattedProperties;
  } catch (error) {
    console.error("Error fetching featured listings:", error);
    return [];
  }
};


const PropertyDetailsView = async ({ entityId }) => {
  const details = await getPropertyDetails(entityId);

  if (!details || details.length === 0) {
    return <p>Property details not available.</p>;
  }

  const PropertyDetail = details[0];
  const featuredListings = await getFeaturedListings(PropertyDetail?.PropertySubType);

  return (
    //  <Suspense fallback={<LoadingOverlay loading={true}>Loading...</LoadingOverlay>}>
    <div>
      {/* Main Header Nav */}
      <DefaultHeader data={PropertyDetail?.ClientImageUrl || PropertyDetail?.ClientName} />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu data={PropertyDetail?.ClientImageUrl || PropertyDetail?.ClientName} />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt60 pb0 bgc-f7">
        <div className="container bdrs12 bgc-white p25">
          <div className="row">
            <PropertyHeader data={PropertyDetail} />
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            <PropertyGallery data={PropertyDetail} />
          </div>
          {/* End .row */}

          <div className="row mt30 justify-content-center">
            <OverView data={PropertyDetail} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}

      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions data={PropertyDetail} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails data={PropertyDetail} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <PropertyAddress data={PropertyDetail} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
                  <PropertyFeaturesAminites data={PropertyDetail} />
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Floor Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                      <FloorPlans data={PropertyDetail} />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Video</h4>
                <div className="row">
                  <PropertyVideo data={PropertyDetail} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">360° Virtual Tour</h4>
                <div className="row">
                  <VirtualTour360 data={PropertyDetail} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                <div className="row">
                  <PropertyNearby data={PropertyDetail} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Submit Inquiry</h4>
                <InfoWithForm data={PropertyDetail} />
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h6 className="title fz17 mb30">Submit Application</h6>
                  {/* <ContactWithAgent data={PropertyDetail} /> */}
                  <CalendarSchedular data={PropertyDetail} />
                  <ScheduleForm data={PropertyDetail} />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Discover Our Featured Listings</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
            {/* End header */}

            {/*             <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </div> */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <DiscoverListings data={featuredListings} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
    //  </Suspense>
  );
};

export default PropertyDetailsView;
