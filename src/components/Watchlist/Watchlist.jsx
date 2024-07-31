import MovieCard from "../Movies/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import "./WatchList.css";

const WatchList = () => {
  const { state } = useAuth();
  const { authenticated, userId } = state;
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      if (authenticated) {
        try {
          const { data, error } = await supabase
            .from("watchlist")
            .select("movie_id")
            .eq("user_id", userId);

          if (error) throw error;

          const moviePromises = data.map((item) =>
            axios.get(`/api/movies/${item.movie_id}`)
          );
          const movies = await Promise.all(moviePromises);

          setWatchlist(movies.map((response) => response.data));
          localStorage.setItem(
            `watchlist_${userId}`,
            JSON.stringify(movies.map((response) => response.data))
          );
        } catch (error) {
          console.error("Error fetching watchlist:", error);
        }
      } else {
        navigate("/login");
      }
    };

    const localWatchlist = JSON.parse(
      localStorage.getItem(`watchlist_${userId}`)
    );
    if (localWatchlist) {
      setWatchlist(localWatchlist);
    } else {
      loadWatchlist();
    }
  }, [authenticated, navigate, userId]);

  const removeFromWatchlist = async (movieId) => {
    try {
      const { error } = await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', userId)
      .eq('movie_id', movieId)

      if (error) throw error;

      const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId)
      setWatchlist(updatedWatchlist);
      localStorage.setItem(`watchlist_${userId}`, JSON.stringify(updatedWatchlist))
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="watch-list-container">
      <h2 className="watchlist">Watchlist</h2>
      <div className="movie-cards-container">
        {watchlist.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            inWatchlist
            onRemoveFromWatchlist={removeFromWatchlist}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchList;
