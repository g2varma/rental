import React from "react";

const PropertyAddress = ({ data }) => {

  return (
    <>
      <div
        className={`col-md-12 col-xl-8`}
      >
        <div className="d-flex justify-content-between">
          <div className="pd-list">
            <p className="fw600 mb10 ff-heading dark-color">Address</p>
            <p className="fw600 mb-0 ff-heading dark-color">Province</p>
          </div>
          <div className="pd-list">
            <p className="text mb10">{data?.FormattedAddress}</p>
            <p className="text mb-0">{data?.ProvinceName}</p>
          </div>
        </div>
      </div>

      {/* End col */}

      <div className="col-md-12">
        <iframe
          className="position-relative bdrs12 mt30 h250"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${data?.FormattedAddress}&t=m&z=14&output=embed&iwloc=near`}
          title={data?.FormattedAddress}
          aria-label={data?.FormattedAddress}
        />
      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
