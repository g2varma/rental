"use client";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ScheduleForm = ({ data }) => {
  const captchaRef = useRef(null);

  // Function to handle the redirection
  const handleRedirect = () => {
    const propertyId = data?.PropertyId;
    const unitTypeId = data?.PropertyUnitTypeId;

    if (propertyId && unitTypeId) {
      // Construct the URL with propertyId and unitTypeId
      const redirectUrl = `https://manage.mipropertyportal.com/App/RentalApplication/Index?propertyId=${propertyId}&unitTypeId=${unitTypeId}`;
      // Redirect the user
      window.location.href = redirectUrl;
    } else {
      alert("PropertyId or PropertyUnitTypeId is missing!");
    }
  };

  return (
    <>
      {/* Commented out the form */}
      {/* 
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12">
            <div className="mb15">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb15">
              <input
                type="email"
                className="form-control"
                placeholder="ibthemes21@gmail.com"
                required
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb15">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your phone"
                required
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb15">
              <textarea
                cols={30}
                rows={4}
                placeholder="Hello, I am interested in [Renovated apartment at last floor]"
                defaultValue={""}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="mb15">
              <label className="ff-heading">
                By submitting form I agree to Terms of Use
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  ref={captchaRef}
                />
              </label>
            </div>
          </div>
          <div className="col-md-12">
            <div className="d-grid">
              <button type="submit" className="ud-btn btn-thm">
                Submit Application
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </form>
      */}

      {/* Button for redirection */}
      <div className="d-grid">
        <button
          type="button"
          className="ud-btn btn-thm"
          onClick={handleRedirect}
        >
          Submit Application
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </>
  );
};

export default ScheduleForm;
