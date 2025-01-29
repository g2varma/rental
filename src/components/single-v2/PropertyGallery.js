"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyGallery = ({ data }) => {
  const [mainImageHeight, setMainImageHeight] = useState(0);
  const mainImageRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (mainImageRef.current) {
        setMainImageHeight(mainImageRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const onImageError = (e) => {
    e.target.src = "/images/placeholders/not-found.jpg";
  };

  const PropertyImageURL = useMemo(() => {
    const images = data?.Images?.PropertyImageUrl || []; // Get images from API or an empty array

    // Show fallback only if there are no images at all
    if (images.length === 0) {
      return ["/images/placeholders/not-found.jpg"];
    }

    return images; // Return only available images
  }, [data]);

  const defaultImageUrl = "/images/placeholders/not-found.jpg"; // Default image URL for the main image
  const mainImageUrl = data?.Images?.PropertyDefaultImageUrl || PropertyImageURL[0] || defaultImageUrl;

  return (
    <Gallery>
      <div
        className="row"
        style={{
          display: "flex",
          height: mainImageHeight ? `${mainImageHeight}px` : "auto",
          overflow: "auto",
        }}
      >
        <div className="col-sm-9">
          <div className="sp-img-content mb15-md">
            <div
              className="popup-img preview-img-1 sp-img"
              ref={mainImageRef}
            >
              <Item
                original={mainImageUrl}
                thumbnail={mainImageUrl}
                width={890}
                height={510}
              >
                {({ ref: ref1, open }) => (
                  <Image
                    src={mainImageUrl}
                    width={890}
                    height={510}
                    ref={ref1}
                    onClick={open}
                    alt="Property Main Image"
                    role="button"
                    className="w-100 h-100 cover"
                    onError={onImageError}
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-9 */}

        <div className="col-sm-3" style={{ height: "100%" }}>
          <div className="row">
            {PropertyImageURL.slice(0, 2).map((image, index) => (
              <div className="col-sm-12 ps-lg-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${index + 2} sp-img`}
                  >
                    <Item
                      original={image}
                      thumbnail={image}
                      width={890}
                      height={510}
                      className="w-100 h-100 cover"
                    >
                      {({ ref: ref2, open }) => (
                        <Image
                          width={270}
                          height={250}
                          className="w-100 h-100 cover"
                          ref={ref2}
                          onClick={open}
                          role="button"
                          src={image}
                          alt={`Property image ${index + 1}`}
                          onError={onImageError}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyGallery;
