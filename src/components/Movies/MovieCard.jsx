import { useState, useContext } from "react";
// import Rating from "../Rating/Rating";
import axios from "axios";
import AuthContext from "../../store/authContext";
import "./MovieCard.css";

const MovieCard = ({
  movie,
  inWatchlist,
  inFavorites,
  onRemoveFromWatchlist,
  onRemoveFromFavorites,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [rating, setRating] = useState(movie.vote_average);
  const { state } = useContext(AuthContext);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const addToWatchlist = async () => {
    try {
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      if (!watchlist.some((item) => item.id === movie.id)) {
        await axios.post("/watchlist", {
          user_id: state.userId,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        });
        const updatedWatchlist = [...watchlist, movie];
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        alert(`${movie.title} added to watchlist`);
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      alert("Failed to add to watchlist");
    }
  };

  const removeFromWatchlist = async () => {
    try {
      await axios.delete("/watchlist", {
        data: { user_id: state.userId, movie_id: movie.id },
      });
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${movie.title} removed from watchlist!`);
      toggleModal();
      if (onRemoveFromWatchlist) onRemoveFromWatchlist(movie.id);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      alert("Failed to remove from watchlist.");
    }
  };

  const addToFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
     
      if (favorites.length < 4) {
        await axios.post("/favorites", {
          user_id: state.userId,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
        });
        const updatedFavorites = [...favorites, movie];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        alert(`${movie.title} added to favorites!`);
      } else {
        alert("Maximum number of favorites reached!");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };

  // DO MORE WORK ON RATING WHEN I CAN - NOT TOP PRIORITY - JUST REALIZED IT DOESN'T DO ANYTHING
  // const handleRating = (newRating) => {
  //   setRating(newRating);
  //   alert(`${movie.title} rated ${newRating} stars!`);
  // };

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
              {/* <p>
                Rating: <Rating rating={rating} onRatingChange={handleRating} />
              </p> */}
              <p>Average Rating: {movie.vote_average}</p>
              {inWatchlist ? (
                <button onClick={removeFromWatchlist}>
                  Delete from Watchlist
                </button>
              ) : (
                <button onClick={addToWatchlist}>Add to Watchlist</button>
              )}
              {inFavorites ? (
                <button onClick={onRemoveFromFavorites}>
                  Delete from Favorites
                </button>
              ) : (
                <button onClick={addToFavorites}>Add to Favorites</button>
              )}
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
      </div>
    </div>
  );
};

export default MovieCard;