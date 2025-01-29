"use client";

import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
  scrollwheel: true,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function ListingMap({ pageItems }) {
  const [getLocation, setLocation] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const defaultCenter = useMemo(
    () => ({ lat: 27.411201277163975, lng: -96.12394824867293 }),
    []
  );

  const fitBoundsToMarkers = () => {
    if (mapRef.current && pageItems.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      pageItems.forEach((marker) => {
        bounds.extend({
          lat: marker.PropertyLatitude,
          lng: marker.PropertyLongitude,
        });
      });
      mapRef.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    fitBoundsToMarkers();
  }, [pageItems]);

  const locationHandler = (location) => {
    setLocation(location);
  };

  const closeCardHandler = () => {
    setLocation(null);
  };

  const onImageError = (e) => {
    e.target.src = "/images/placeholders/not-found.jpg";
  };

  return (
    <>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter} // Initial center
          zoom={4} // Initial zoom
          options={option}
          onLoad={(map) => {
            mapRef.current = map;
            fitBoundsToMarkers(); // Ensure bounds are adjusted on load
          }}
        >
          <MarkerClusterer>
            {(clusterer) =>
              pageItems.map((marker) => (
                <Marker
                  key={marker.PropertyUnitTypeListingId}
                  position={{
                    lat: marker.PropertyLatitude,
                    lng: marker.PropertyLongitude,
                  }}
                  clusterer={clusterer}
                  onClick={() => locationHandler(marker)}
                />
              ))
            }
          </MarkerClusterer>
          {getLocation !== null && (
            <InfoWindow
              position={{
                lat: getLocation?.PropertyLatitude,
                lng: getLocation?.PropertyLongitude,
              }}
              onCloseClick={closeCardHandler}
            >
              <div>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100 h-100 cover object-cover"
                      style={{ maxWidth: "300px" }}
                      src={getLocation?.PropertyDefaultImageUrl || "/images/placeholders/not-found.jpg"}
                      alt="listings"
                      onError={onImageError}
                    />
                    <div className="sale-sticker-wrap">
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    </div>
                    <div className="list-price">
                      {getLocation?.RentAmount} / <span>mo</span>
                    </div>
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/${getLocation?.PropertyUnitTypeListingId}`}>
                        {getLocation?.ListingTitle}
                      </Link>
                    </h6>
                    <p className="list-text">{getLocation?.FormattedAddress}</p>
                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-bed" /> {getLocation?.BedRoom ?? 0} bed
                      </a>
                      <a href="#">
                        <span className="flaticon-shower" /> {getLocation?.BathRoom ?? 0} bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {getLocation?.UnitTypeSizeInSqFt} sqft
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}







/* "use client";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 45,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
  scrollwheel: true,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};
export default function ListingMap({ pageItems }) {
  const [getLocation, setLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(
    () => ({ lat: 27.411201277163975, lng: -96.12394824867293 }),
    []
  );

  // add long & lat
  const locationHandler = (location) => {
    setLocation(location);
  };

  // close handler
  const closeCardHandler = () => {
    setLocation(null);
  };
  const onImageError = (e) => {
    e.target.src = "/images/placeholders/not-found.jpg";
  };

  return (
    <>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          options={option}
        >
          <MarkerClusterer>
            {(clusterer) =>
              pageItems.map((marker) => (
                <Marker
                  key={marker.PropertyUnitTypeListingId}
                  position={{
                    lat: marker.PropertyLatitude,
                    lng: marker.PropertyLongitude,
                  }}
                  clusterer={clusterer}
                  onClick={() => locationHandler(marker)}
                ></Marker>
              ))
            }
          </MarkerClusterer>
          {getLocation !== null && (
            <InfoWindow
              position={{
                lat: getLocation?.PropertyLatitude,
                lng: getLocation?.PropertyLongitude,
              }}

              onCloseClick={closeCardHandler}
            >
              <div>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100 h-100 cover object-cover"
                      style={{ maxWidth: "300px" }}
                      src={getLocation?.PropertyDefaultImageUrl}
                      alt="listings"
                      onError={onImageError}
                    />
                    <div className="sale-sticker-wrap">
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    </div>

                    <div className="list-price">
                      {getLocation?.RentAmount} / <span>mo</span>
                    </div>
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/${getLocation?.PropertyUnitTypeListingId}`}>
                        {getLocation?.ListingTitle}
                      </Link>
                    </h6>
                    <p className="list-text">{getLocation?.FormattedAddress}</p>
                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-bed" /> {getLocation?.BedRoom ?? 0} bed
                      </a>
                      <a href="#">
                        <span className="flaticon-shower" /> {getLocation?.BathRoom ?? 0}
                        bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {getLocation?.UnitTypeSizeInSqFt}
                        sqft
                      </a>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="list-meta2 d-flex justify-content-between align-items-center">
                      <span className="for-what">For Rent</span>
                      <div className="icons d-flex align-items-center">
                        <a href={`/${listing.PropertyUnitTypeListingId}`} title="Full Screen">
                          <span className="flaticon-fullscreen" />
                        </a>
                        <a href={`/${listing.PropertyUnitTypeListingId}`} target="_blank" rel="noopener noreferrer" title="Open in new tab">
                          <span className="flaticon-new-tab" />
                        </a>
                        <a href="#" title="Like">
                          <span className="flaticon-like" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}
 */