import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MovieCard from "../Movies/MovieCard";
import "./TopFavorites.css";
import AuthContext from "../../store/authContext";

const TopFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    const getMovies = async () => {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites);
      
      if (state.userId) {
        try {
          console.log(`Fetching favorites for userId: ${state.userId}`);
          const response = await axios.get(`/favorites?userId=${state.userId}`);
          setFavorites(response.data);
          localStorage.setItem("favorites", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    getMovies();
  }, [state.userId]);
  
  const removeFromFavorites = async (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    console.log(state)
    try {
      await axios.delete("/favorites", {
        data: { user_id: state.userId, movie_id: movie.id },
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setFavorites(favorites);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
console.log(favorites);
  return (
    <div className="favorites-container">
      <h2 className="favorite-title">Top Favorite Movies</h2>
      <div className="movie-cards-container">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            inFavorites={true}
            onRemoveFromFavorites={() => removeFromFavorites(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default TopFavorite;