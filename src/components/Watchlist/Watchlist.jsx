import MovieCard from "../Movies/MovieCard";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";

const WatchList = () => {
  const { state } = useAuth();
  const { authenticated, userId } = state;
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

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watch-list-container">
      <h2 className="watchlist">Watchlist</h2>
      <div className="movie-cards-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WatchList;