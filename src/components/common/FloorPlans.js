"use client";

import React from "react";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

// Helper function to format numbers with thousand separators
const formatNumber = (num) => {
  if (num == null || isNaN(num)) return "N/A"; // Return "N/A" if the value is null or not a number
  return new Intl.NumberFormat().format(num); // Format number with commas
};

const FloorPlans = ({ data }) => {
  // Use only API-provided images or fallback
  const floorPlanImages =
    data?.Images?.PropertyFloorPlanImageUrl?.length > 0
      ? [...data.Images.PropertyFloorPlanImageUrl]
      : []; // No fallback image if no images are provided

  const floorPlanData = {
    id: "floor-plan",
    title: "Floor Plan",
    size: formatNumber(data?.UnitTypeSizeInSqFt) || "N/A",
    bedrooms: data?.BedRoom || "N/A",
    bathrooms: data?.WashRoom || "N/A",
    price:
      data?.RentAmount != null
        ? `$${formatNumber(data?.RentAmount)}`
        : "Contact",
    images: floorPlanImages, // API images only
  };

  const onImageError = (e) => {
    e.target.src = "/images/placeholders/not-found.jpg";
  };

  const isSingleImage = floorPlanData.images.length === 1;

  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item active">
        <h2 className="accordion-header" id={`heading-floor-plan`}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-floor-plan"
            aria-expanded="true"
            aria-controls="collapse-floor-plan"
          >
            <span className="w-100 d-md-flex align-items-center">
              <span className="mr10-sm">{floorPlanData.title}</span>
              <span className="ms-auto d-md-flex align-items-center justify-content-end">
                <span className="me-2 me-md-4">
                  <span className="fw600">Size: </span>
                  <span className="text">{floorPlanData.size}</span>
                </span>
                <span className="me-2 me-md-4">
                  <span className="fw600">Bedrooms: </span>
                  <span className="text">{floorPlanData.bedrooms}</span>
                </span>
                <span className="me-2 me-md-4">
                  <span className="fw600">Bathrooms: </span>
                  <span className="text">{floorPlanData.bathrooms}</span>
                </span>
                <span>
                  <span className="fw600">Price: </span>
                  <span className="text">{floorPlanData.price}</span>
                </span>
              </span>
            </span>
          </button>
        </h2>
        <div
          id="collapse-floor-plan"
          className="accordion-collapse collapse show"
          aria-labelledby={`heading-floor-plan`}
          data-parent="#accordionExample"
        >
          <div className="accordion-body text-center">
            {floorPlanData.images.length > 0 ? (
              <Gallery>
                {isSingleImage ? (
                  // Single image layout
                  <Item
                    original={floorPlanData.images[0]}
                    thumbnail={floorPlanData.images[0]}
                    width={1200}
                    height={800}
                  >
                    {({ ref, open }) => (
                      <div
                        className="floor-plan-single-image"
                        onClick={open}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          ref={ref}
                          width={800}
                          height={300}
                          className="w-100"
                          src={floorPlanData.images[0]}
                          alt="Floor Plan"
                          style={{
                            objectFit: "contain",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                          }}
                          onError={onImageError}
                        />
                      </div>
                    )}
                  </Item>
                ) : (
                  // Multiple images layout
                  <div
                    className="floor-plan-images-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {floorPlanData.images.map((imageUrl, i) => (
                      <Item
                        key={`image-${i}`}
                        original={imageUrl}
                        thumbnail={imageUrl}
                        width={1200}
                        height={800}
                      >
                        {({ ref, open }) => (
                          <div
                            className="floor-plan-image-item"
                            onClick={open}
                            style={{ cursor: "pointer" }}
                          >
                            <Image
                              ref={ref}
                              width={300}
                              height={300}
                              className="w-100"
                              src={imageUrl}
                              alt={`Floor Plan ${i + 1}`}
                              style={{
                                objectFit: "contain",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                              }}
                              onError={onImageError}
                            />
                          </div>
                        )}
                      </Item>
                    ))}
                  </div>
                )}
              </Gallery>
            ) : (
              <p>No floor images available.</p> // Message when no images are available
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlans;
