import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";

export default function Rating({ noOfStars = 10 }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHovered(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHovered(rating);
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;

        return (
          <FaStar
            key={index}
            className={index <= (hovered || rating) ? "active" : "inactive"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        );
      })}
    </div>
  );
}
