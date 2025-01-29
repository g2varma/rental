"use client";

import React, { useState } from "react";

const PropertyHeader = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShare = () => {
    setShowModal(true); // Open the modal
  };

  const handleCopyLink = async () => {
    try {
      const currentURL = window.location.href; // Get the current page URL
      await navigator.clipboard.writeText(currentURL); // Copy the link to the clipboard
      setIsCopied(true); // Show feedback
      setTimeout(() => setIsCopied(false), 3000); // Hide feedback after 3 seconds
    } catch (error) {
      console.error("Failed to copy the link:", error);
    }
  };

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data?.ListingTitle}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {data?.FormattedAddress}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For Rent
            </a>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a
                className="icon mr10"
                onClick={handleShare}
                style={{ cursor: "pointer" }}
              >
                <span className="flaticon-share-1" />
              </a>
            </div>
            <h3 className="price mb-0">
              {data?.RentAmount != null
                ? `$${new Intl.NumberFormat().format(data.RentAmount)}`
                : "Contact"}
            </h3>
            <p className="text space fz15">
              {`${new Intl.NumberFormat().format(data?.UnitTypeSizeInSqFt ?? 0)} Sq Ft`}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowModal(false)} // Close modal when clicking outside
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal
          >
            <h3 className="modal-title">Share this Listing</h3>
            <div className="modal-content">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="share-link"
              />
              <button onClick={handleCopyLink} className="copy-btn">
                {isCopied ? "Copied!" : "Copy Link"}
              </button>
              <div className="share-buttons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={`mailto:?subject=Check out this listing&body=${window.location.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-button"
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
              <button
                onClick={() => setShowModal(false)} // Close modal on button click
                className="close-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Styling */}
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
        .modal-container {
          background: white;
          padding: 25px;
          border-radius: 15px;
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
        .modal-title {
          font-size: 1.6rem;
          color: #333;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .modal-content {
          margin-top: 15px;
          border:none;
        }
        .share-link {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          font-size: 1rem;
          border-radius: 8px;
        }
        .share-buttons {
          display: flex;
          justify-content: space-around;
          gap: 15px;
          margin: 20px 0;
        }
        .share-button {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border-radius: 50%;
          text-decoration: none;
          font-size: 1.4rem;
        }
        .share-button i {
          margin: 0;
        }
        .share-button:nth-child(1) {
          background-color: #3b5998; /* Facebook */
        }
        .share-button:nth-child(2) {
          background-color: #25d366; /* WhatsApp */
        }
        .share-button:nth-child(3) {
          background-color: #1da1f2; /* Twitter */
        }
        .share-button:nth-child(4) {
          background-color: #e1306c; /* Instagram */
        }
        .share-button:nth-child(5) {
          background-color: #ff9900; /* Email */
        }
        .copy-btn,
        .close-modal {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          background-color: #eb6753;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
        }
        .copy-btn:hover,
        .close-modal:hover {
          background-color: #d15444;
        }
      `}</style>
    </>
  );
};

export default PropertyHeader;
