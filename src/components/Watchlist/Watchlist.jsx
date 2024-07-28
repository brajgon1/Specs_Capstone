import MovieCard from "../Movies/MovieCard";
import axios from "axios";
import { useEffect, useState } from 'react'
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import "./WatchList.css";

const WatchList = () => {
  const { state } = useAuth()
  const { authenticated, userId } = state
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      if (authenticated) {
        try {
          const response = await axios.get(`/api/watchlist?userId=${userId}`);
          setWatchlist(response.data);
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      } else {
        navigate('/login');
      }
    };

    loadWatchlist();
  }, [authenticated, navigate, userId]);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(watchlist));
    }
  }, [watchlist, authenticated, userId]);

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
