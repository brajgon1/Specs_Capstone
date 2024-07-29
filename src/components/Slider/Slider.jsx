import "./Slider.css";

const Slider = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbers = 5;
  const halfMax = Math.floor(maxPageNumbers / 2);
  let startPage, endPage;

  if (totalPages <= maxPageNumbers) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= halfMax) {
      startPage = 1;
      endPage = maxPageNumbers;
    } else if (currentPage + halfMax >= totalPages) {
      startPage = totalPages - maxPageNumbers + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfMax;
      endPage = currentPage + halfMax;
    }
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="slider">
      <span
        onClick={() => onPageChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        Previous
      </span>
      {pageNumbers.map((number) => (
        <span
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </span>
      ))}
      <span
        onClick={() => onPageChange(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        Next
      </span>
    </div>
  );
};

export default Slider;
