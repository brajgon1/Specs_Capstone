import { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import "./MovieCard.css";

const MovieCard = ({ movie, inWatchlist, onRemoveFromWatchlist }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(movie.vote_average);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const addToWatchlist = () => {
    const currentWatchlist =
      JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!currentWatchlist.some((item) => item.id === movie.id)) {
      const updatedWatchlist = [...currentWatchlist, movie];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${movie.title} added to watchlist!`);
    } else {
      alert(`${movie.title} is already in the watchlist!`);
    }
  };

  const removeFromWatchlist = () => {
    onRemoveFromWatchlist(movie.id);
    const currentWatchlist =
      JSON.parse(localStorage.getItem("watchlist")) || [];
    const updateWatchlist = currentWatchlist.filter(
      (item) => item.id === movie.id
    );
    localStorage.setItem("watchlist", JSON.stringify(updateWatchlist));
    alert(`${movie.title} removed from watchlist!`);
    toggleModal();
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length < 4) {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
          <div className="modal-content">
            <span id="close" onClick={toggleModal}>
              &times;
            </span>
            <div className="modal-details">
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>
                Rating: <Rating rating={rating} onRatingChange={handleRating} />
              </p>
              <p>Average Rating: {movie.vote_average}</p>
              {inWatchlist ? (
                <button onClick={removeFromWatchlist}>
                  Delete from Watchlist
                </button>
              ) : (
                <button onClick={addToWatchlist}>Add to Watchlist</button>
              )}
              <button onClick={addToFavorites}>Add to Favorites</button>
              <p>Overview: {movie.overview}</p>
            </div>
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
