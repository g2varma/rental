"use client";
import React, { useState, useRef } from "react";

const InfoWithForm = ({ data }) => {
  const [formSubmitted, setFormSubmitted] = useState(false); // To track form submission
  const [loading, setLoading] = useState(false); // To track loading state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const successRef = useRef(null); // Ref for the success message

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while submitting

    const requestBody = {
      ...formData,
      property_id: data?.PropertyId,
      unit_type_id: data?.PropertyUnitTypeId,
      client_id: 456, // Static client_id
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setFormSubmitted(true);
        /// Scroll to the success message with an offset
        setTimeout(() => {
          const offset = -150; // Adjust this value as needed
          const topPosition = successRef.current?.getBoundingClientRect().top + window.pageYOffset + offset;
          window.scrollTo({ top: topPosition, behavior: "smooth" });
        }, 100);
      } else {
        const errorData = await response.json();
        console.error("API Error Response: ", errorData);
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  if (formSubmitted) {
    return (
      <div className="success-message" ref={successRef}>
        <h2>Submit Your Inquiry</h2>
        <p style={{ color: "green", fontWeight: "bold" }}>
          Your request has been submitted successfully
        </p>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="row">
        <div className="col-md-12">
          <form className="form-style1 row" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="first.last@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Numbers only"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb10">
                <label className="heading-color ff-heading fw600 mb10">
                  Message
                </label>
                <textarea
                  cols={30}
                  rows={4}
                  name="message"
                  placeholder="Hello, I am interested in renting this unit"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <label className="ff-heading">
                By submitting the form, I agree to Terms of Use
              </label>
            </div>
            <div className="btn-area mt20">
              <button className="ud-btn btn-white2" type="submit" disabled={loading}>
                Submit Inquiry <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #fff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default InfoWithForm;
