import { getListings } from "@/apiFn";
import LoadingOverlay from "@/components/common/Loader";
import DefaultHeader from "@/components/DefaultHeader";
import Wrapper from "@/components/listing/Wrapper";
import MobileMenu from "@/components/mobile-menu";
import { Suspense } from "react";
import convertToPascalCase from "@/utils/camelCase";

export const metadata = {
  title: "MiPPRental | Find your next rental",
};

const SearchPage = async ({ searchParams, homeConfig }) => {
  const {
    page,
    size,
    type,
    propertyType,
    priceL,
    priceH,
    bedrooms,
    bathrooms,
    location,
    sqftL,
    sqftH,
    yearBuildL,
    yearBuildH,
    amenities,
    sort,
    sortOrder,
    key
  } = searchParams;
  const listingsRes = await getListings(
    "/v2/internal/listing",
    page ?? 1,
    size ?? 10,
    type,
    propertyType,
    priceL,
    priceH,
    bedrooms,
    bathrooms,
    location,
    sqftL,
    sqftH,
    yearBuildL,
    yearBuildH,
    amenities,
    sort,
    sortOrder,
    key
  );

  const searchQ = decodeURIComponent(key);

  // Sanitize the response to handle null values and provide defaults
  const sanitizedListings = listingsRes?.properties
    ? listingsRes.properties.map((property) => ({
      ...property,
      property_id: property.property_id || "No Property ID",
      property_name: property.property_name || "Unnamed Property",
      city: property.city || "Unknown City",
      property_listing_id: property.property_listing_id || "No Listing ID",
      property_type: property.property_type || "Unknown Type",
      property_sub_type: property.property_sub_type || "Unknown Sub Type",
      formatted_address: property.formatted_address || "Address not available",
      property_description: property.property_description || "No description available",
      property_latitude: property.property_latitude || 0,
      property_longitude: property.property_longitude || 0,
      intersection: property.intersection || "No intersection data",
      region_code: property.region_code || "Unknown Region",
      province_name: property.province_name || "Unknown Province",
      year_built: property.year_built ?? "Unknown Year",
      property_primary_phone: property.property_primary_phone || "No phone provided",
      property_notification_email: property.property_notification_email || "No email provided",
      property_video_url: property.property_video_url || "No video available",
      community_name: property.community_name || "No community info",
      street_name: property.street_name || "No street info",
      property_email: property.property_email || "No property email provided",
      listing_title: property.listing_title || "Untitled Listing",
      property_unit_type_id: property.property_unit_type_id ?? "Unknown Unit ID",
      property_unit_type_listing_id: property.property_unit_type_listing_id || "No Unit Type Listing ID",
      property_unit_type_title: property.property_unit_type_title || "Unknown Unit Type Title",
      property_unit_type_description: property.property_unit_type_description || "No unit description available",
      bed_room: property.bed_room || "Not specified",
      wash_room: property.wash_room ?? 0,
      rent_amount: property.rent_amount ?? null,
      rent_available_date: property.rent_available_date || "Not available",
      is_hide_rent_amount: property.is_hide_rent_amount ?? null,
      is_hide_phone_number: property.is_hide_phone_number ?? true,
      unit_video_url: property.unit_video_url || "No unit video URL",
      unit_type_size_in_sq_ft: property.unit_type_size_in_sq_ft ?? 0,
      features: property.features?.length > 0 ? property.features : ["No features listed"],
      rental_inquiry_notification_email: property.rental_inquiry_notification_email || "No rental email",
      property_default_image_url: property.property_default_image_url || "/images/placeholders/not-found.jpg",
      client_image_url: property.client_image_url || "/images/placeholders/not-found.jpg",
      client_name: property.client_name || "Not available",
      schedule_showing_url: property.schedule_showing_url || "No schedule URL provided",
      vedio_url_360: property.vedio_url_360 || "No 360° video available",
      neighborhoods: property.neighborhoods || "No neighborhoods available",
    }))
    : [];

  // Convert properties to PascalCase
  const convertedListings = convertToPascalCase(sanitizedListings);
  const totalListings = listingsRes?.totalCount || convertedListings.length;


  return (
    <Suspense fallback={<LoadingOverlay loading={true}>Loading...</LoadingOverlay>}>
      <div>
        {/* Main Header Nav */}
        <DefaultHeader showSearch={true} data="https://www.mipropertyportal.com/wp-content/uploads/2020/10/MiPP-logo-svg.svg" />
        {/* End Main Header Nav */}

        {/* Mobile Nav  */}
        <MobileMenu data="https://www.mipropertyportal.com/wp-content/uploads/2020/10/MiPP-logo-svg.svg" />
        {/* End Mobile Nav  */}
        <Wrapper
          heading={`Search Results for "${searchQ}"`}
          listings={convertedListings} // Pass the camelCase converted data
          total={totalListings} />
      </div>
    </Suspense >
  );
};

export default SearchPage;
