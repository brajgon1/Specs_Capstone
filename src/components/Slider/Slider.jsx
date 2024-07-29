import "./Slider.css";

const Slider = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumber = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  return (
    <div className="slider">
      {pageNumber.map((number) => (
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
