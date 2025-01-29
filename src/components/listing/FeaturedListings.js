"use client";

import Image from "next/image";
import Link from "next/link";

const FeaturedListings = ({ data = [], className, listClassName }) => {
  const onImageError = (e) => {
    e.target.src = "/images/placeholders/not-found.jpg";
  };

  return (
    <>
      {data.length > 0 ? (
        data.map((listing, index) => (
          <div className={`${className} listing-row`} key={`${listing.id}-${index}`}>
            <div className={listClassName ?? "listing-style1"}>
              <Link href={`/${listing.PropertyUnitTypeListingId}`} passHref>
                <div className="list-thumb">
                  <Image
                    width={382}
                    height={248}
                    className="w-100  cover"
                    src={listing.PropertyDefaultImageUrl}
                    alt="listings"
                    onError={onImageError}
                  />
                  <div className="sale-sticker-wrap">
                    {!listing.forRent && (
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FOR RENT
                      </div>
                    )}
                  </div>

                  <div className="list-price">
                    {listing?.IsHideRentAmount ? (
                      <>Contact</>
                    ) : (
                      <>
                        {`$${listing.RentAmount}`} / <span>mo</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>

              <div className="list-content">
                <h6 className="list-title">
                  <Link href={`/${listing.PropertyUnitTypeListingId}`}>
                    {listing.ListingTitle}
                  </Link>
                </h6>
                <p className="list-text">{listing.FormattedAddress}</p>
                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing.BedRoom}
                  </a>
                  <a href="#">
                    <span className="flaticon-shower" /> {listing.WashRoom} bath
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" />
                    {listing.UnitTypeSizeInSqFt > 0
                      ? `${listing.UnitTypeSizeInSqFt} sqft`
                      : "-- sqft"}
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="d-flex justify-content-center align-items-center w-100">
                  <Link href={`/${listing.PropertyUnitTypeListingId}`} passHref>
                    <button className="ud-btn btn-thm w-100 text-center">
                      VIEW DETAILS
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No listings available</p>
      )}

      <style jsx>{`
        .listing-row {
          margin-bottom: 30px; /* Add space below each row */
        }
        .listing-style1 {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .list-thumb {
          height: 230px;
          overflow: hidden;
          display: flex;
        }

        .list-thumb img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .list-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .list-meta {
          margin-top: auto;
        }

        .list-title {
          font-weight: bold;
          margin-bottom: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ud-btn {
          background-color: black;
          color: white;
          border: none;
          padding: 15px 90px;
          font-weight: bold;
        }

        .ud-btn i {
          margin-left: 8px;
        }

        .list-text {
          margin-bottom: 8px;
        }
      `}</style>
    </>
  );
};

export default FeaturedListings;
