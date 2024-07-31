import MovieCard from "../Movies/MovieCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";

// NEED TO WORK ON UPLOADING THE WATCHLIST TO THE DATABASE & USING LOCAL STORAGE

const WatchList = () => {
  const { state } = useAuth();
  const { authenticated } = state;
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    } else {
      const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(storedWatchlist);
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, authenticated]);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
  };

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watch-list-container">
      <h2 className="watchlist">Watchlist</h2>
      <div className="movie-cards-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              inWatchlist={true} 
              onRemoveFromWatchlist={removeFromWatchlist} 
            />
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WatchList;