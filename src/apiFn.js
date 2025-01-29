import { AUTH_FULL_URL_GET } from "@/action";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getListings = async (
  startUrl,
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
  sortKey,
  sortValue,
  searchKey,
  entityId
) => {
  try {
    const urlMain = new URL(`${BASE_URL}${startUrl}`);
    if (page) urlMain.searchParams.set("pageNumber", page);
    if (size) urlMain.searchParams.set("pageSize", size);

    // Collect filters into a single array
    const filters = [];

    // Handle `type` filter
    if (type && type.toLowerCase() !== "all") {
      const validTypes = decodeURIComponent(type)
        .split(",")
        .filter((t) => t.toLowerCase() !== "null" && t.trim() !== "");

      if (validTypes.length > 0) {
        if (entityId && entityId.charAt(0).toUpperCase() === "P" || searchKey) {
          filters.push(`property_type:${validTypes.join(",")}`);
        } else {
          filters.push(`type:${validTypes.join(",")}`);
        }
      }
    }


    // Handle `propertyType` filter (separate from `type`)
    if (propertyType && propertyType.toLowerCase() !== "all") {
      const validPropertyTypes = decodeURIComponent(propertyType)
        .split(",")
        .filter((pt) => pt.toLowerCase() !== "null" && pt.trim() !== "");

      if (validPropertyTypes.length > 0) {
        filters.push(`property_type:${validPropertyTypes.join(",")}`);
      }
    }

    // Handle `entityId` filter based on prefix
    if (entityId) {
      const prefix = entityId.charAt(0).toUpperCase();
      if (prefix === "C") {
        filters.push(`client_id:${entityId}`);
      } else if (prefix === "P") {
        filters.push(`property_id:${entityId}`);
      }
    }
    // Handle price filters
    if (priceL) filters.push(`min_price:${priceL}`);
    if (priceH) filters.push(`max_price:${priceH}`);

    // Handle size filters
    if (sqftL) filters.push(`min_size:${sqftL}`);
    if (sqftH) filters.push(`max_size:${sqftH}`);

    // Handle room filters
    if (bedrooms) filters.push(`bed_room:${bedrooms}`);
    if (bathrooms) filters.push(`wash_room:${bathrooms}`);

    // Handle year build filters
    if (yearBuildL || yearBuildH) {
      const yearRange = `${yearBuildL || ""}-${yearBuildH || ""}`;
      filters.push(`maxage:${yearRange}`);
    }

    // Handle amenities filter
    if (amenities) {
      const decodedAmenities = decodeURIComponent(amenities);
      filters.push(`Features:${decodedAmenities}`);
    }

    // Handle searchKey filter
    if (searchKey) {
      const properlyEncodedSearchKey = decodeURIComponent(searchKey.trim()); // Ensure it's decoded first
      filters.push(`global:${properlyEncodedSearchKey}`); // Do not encode again
    }

    // Handle location filter
    if (location) {
      const decodedLocation = decodeURIComponent(location);
      filters.push(`city:${decodedLocation}`);
    }

    // Append filters to URL
    if (filters.length > 0) {
      urlMain.searchParams.set("filter", filters.join("|"));
    }

    // Set remaining query parameters
    if (sortKey) urlMain.searchParams.set("sort", sortKey);
    if (sortValue) urlMain.searchParams.set("sortOrder", sortValue);

    const response = await AUTH_FULL_URL_GET(urlMain);
    return response;
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};
