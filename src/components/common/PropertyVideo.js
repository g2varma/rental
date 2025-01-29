"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

// Function to extract YouTube ID from URL
function extractYouTubeId(url) {
  // Check if the URL is valid before trying to match
  if (!url) return null; // Return null if URL is undefined or null

  const regex = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return the ID or null if not found
}

const PropertyVideo = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  const videoId = extractYouTubeId(data?.PropertyVideoUrl);

  if (!videoId) {
    return (
      <div className="col-md-12">
        <p className="text-center">No video available</p>
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // YouTube thumbnail URL

  return (
    <>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      <div className="col-md-12">
        <div className="property_video bdrs12 w-100">
          <button
            className="video_popup_btn mx-auto popup-img"
            onClick={() => setOpen(true)}
            style={{
              border: "none",
              background: `url(${thumbnailUrl}) center center / cover`, // Set background to YouTube thumbnail
              height: "350px", // Set height (optional, can be adjusted)
              width: "100%", // Full width of the parent container
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="flaticon-play" />
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyVideo;
