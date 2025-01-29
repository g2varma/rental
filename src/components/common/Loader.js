"use client";

const LoadingOverlay = ({
  loading,
  spinnerColor = "#eb6753",
  textColor = "#333333"
}) => {
  return (
    <>
      {loading ? (
        <div
          style={{
            zIndex: 9999,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "none",
            background: "rgba(247, 247, 247, 0.8)",
          }}
        >
          {/* Spinner */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "64px",
              height: "64px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                border: `4px solid rgba(235, 103, 83, 0.3)`, // Subtle outer ring
                borderTop: `4px solid ${spinnerColor}`, // Vibrant spinner
                borderRadius: "50%",
                animation: "spin 1.2s linear infinite",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                width: "80%",
                height: "80%",
                border: `4px solid rgba(235, 103, 83, 0.2)`, // Lighter inner ring
                borderTop: `4px solid ${spinnerColor}`,
                borderRadius: "50%",
                animation: "spin-reverse 1.5s linear infinite",
              }}
            ></div>
          </div>

          {/* Loading Message */}
          <div
            style={{
              marginTop: "20px",
              color: textColor,
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Loading...
          </div>

          {/* Animations */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes spin-reverse {
                0% { transform: rotate(360deg); }
                100% { transform: rotate(0deg); }
              }
            `}
          </style>
        </div>
      ) : null}
    </>
  );
};

export default LoadingOverlay;
