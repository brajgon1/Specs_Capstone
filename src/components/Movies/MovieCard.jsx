import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../Rating/Rating";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(movie.vote_average);
  const [watchlist, setWatchlist] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const addToWatchlist = () => {
    setWatchlist([...watchlist, movie]);
    alert(`${movie.title} added to watchlist!`);
  };

  const addToFavorites = () => {
    if (favorites.length < 4) {
      setFavorites([...favorites, movie]);
      alert(`${movie.title} added to favorites!`);
    } else {
      alert("Maximum number of favorites reached!");
    }
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    alert(`${movie.title} rated ${newRating} stars!`);
  };

  return (
    <div>
      {modalOpen && (
        <div id="myModal" className="modal">
          <span id="close" onClick={toggleModal}>
            X
          </span>
          <img
            className="modal-content modalImg"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt="Movie Poster"
          />
          <div className="modal-details">
            <h2>{movie.title}</h2>
            <p>
              Rating: <Rating rating={rating} onRatingChange={handleRating} />
            </p>
            <button onClick={addToWatchlist}>Add to Watchlist</button>
            <button onClick={addToFavorites}>Add to Favorites</button>
          </div>
        </div>
      )}
      <div className="movie-card" onClick={toggleModal}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt="Movie Poster"
        />
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
