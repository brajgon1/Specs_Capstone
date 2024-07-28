import MovieCard from "../Movies/MovieCard";
import axios from "axios";
import { useEffect, useState } from 'react'
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";

const WatchList = () => {
  const { state } = useAuth()
  const { authenticated } = state
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    } else {
     axios.get('/api/watchlist').then(response => setWatchlist(response.data));
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watch-list-container">
      <h2 className="watchlist">Watchlist</h2>
      <div className="movie-cards-container">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchList;
