"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

// Function to extract YouTube ID from URL
function extractYouTubeId(url) {
  if (!url) return null; // Return null if URL is undefined or null

  const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null; // Return the ID or null if not found
}

const VirtualTour360 = ({ data }) => {
  const [isOpen, setOpen] = useState(false);
  const videoId = extractYouTubeId(data?.VedioUrl_360);

  if (!videoId) return null; // Return nothing if the video ID is invalid

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

export default VirtualTour360;







/* import Image from "next/image";
import React from "react";

const VirtualTour360 = ({ data }) => {
  return (
    <>
      <div className="col-md-12">
        <Image
          width={736}
          height={373}
          src={data?.VedioUrl_360 || "/images/placeholders/not-found.jpg"} // Use VedioUrl360 or fallback to a default image
          alt="virtual tour"
          className="w-100 bdrs12 h-100 cover"
        />
      </div>
    </>
  );
};

export default VirtualTour360;
 */