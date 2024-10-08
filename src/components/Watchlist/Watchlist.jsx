import { useEffect, useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Movies/MovieCard";
import Header from "../Navigation/Header";
import axios from "axios";
import "./WatchList.css";

const WatchList = () => {
  const { state } = useAuth();
  const { authenticated } = state;
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const getWatchlist = async () => {
      try {
        const response = await axios.get('/watchlist', {
          params: { userId: state.userId }
        })
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    }

    if (!authenticated) {
      navigate("/login");
    } else {
      getWatchlist();
    }

  }, [authenticated, navigate, state.userId]);

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, authenticated]);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
  };

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="watch-list-container">
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
            <p className="watchlist-p">Your watchlist is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchList;