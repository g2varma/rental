"use client";

const Pagination = ({
  pageNumber: pageNumberInString,
  setPageNumber,
  total: totalInString,
  sizeNumber: sizeNumberInString,
}) => {
  const pageNumber = parseInt(pageNumberInString);
  const total = parseInt(totalInString);
  const sizeNumber = parseInt(sizeNumberInString);

  // Calculate total pages
  const totalPages = Math.ceil(total / sizeNumber);

  // Handler for the previous button
  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Handler for the next button
  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to render page numbers
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Render page 1 if totalPages is 1
    if (totalPages === 1) {
      pageNumbers.push(
        <li
          key={1}
          onClick={() => setPageNumber(1)}
          className={pageNumber === 1 ? "active page-item" : "page-item"}
        >
          <span className="page-link pointer">1</span>
        </li>
      );
      return pageNumbers;
    }

    // Add first page
    pageNumbers.push(
      <li
        key={1}
        onClick={() => setPageNumber(1)}
        className={pageNumber === 1 ? "active page-item" : "page-item"}
      >
        <span className="page-link pointer">1</span>
      </li>
    );

    // Add ellipsis if necessary
    if (pageNumber > 3) {
      pageNumbers.push(
        <li key="ellipsis1">
          <span>...</span>
        </li>
      );
    }

    // Add middle pages
    const startPage = Math.max(2, pageNumber - 1);
    const endPage = Math.min(totalPages - 1, pageNumber + 1);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={pageNumber === i ? "active page-item" : "page-item"}
        >
          <span className="page-link pointer">{i}</span>
        </li>
      );
    }

    // Add ellipsis if necessary
    if (pageNumber < totalPages - 2) {
      pageNumbers.push(
        <li key="ellipsis2">
          <span>...</span>
        </li>
      );
    }

    // Add last page
    pageNumbers.push(
      <li
        key={totalPages}
        onClick={() => setPageNumber(totalPages)}
        className={pageNumber === totalPages ? "active page-item" : "page-item"}
      >
        <span className="page-link pointer">{totalPages}</span>
      </li>
    );

    return pageNumbers;
  };

  return (
    <div className="mbp_pagination text-center">
      {total > 0 ? (
        <>
          <ul
            className="page_navigation"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Previous Button */}
            <li className="page-item">
              <span
                className={`page-link pointer ${pageNumber === 1 ? "disabled" : ""
                  }`}
                onClick={handlePrevious}
              >
                <span className="fas fa-angle-left" />
              </span>
            </li>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <li className="page-item">
              <span
                className={`page-link pointer ${pageNumber === totalPages ? "disabled" : ""
                  }`}
                onClick={handleNext}
              >
                <span className="fas fa-angle-right" />
              </span>
            </li>
          </ul>

          {/* Pagination Info */}
          <p className="mt10 pagination_page_count text-center">
            {(pageNumber - 1) * sizeNumber + 1}-
            {Math.min(pageNumber * sizeNumber, total)} of {total} properties
            available
          </p>
        </>
      ) : (
        <p className="text-center mt10">No properties available</p>
      )}
    </div>
  );
};

export default Pagination;
