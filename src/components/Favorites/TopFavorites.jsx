import { useEffect, useState } from "react";
import MovieCard from "../Movies/MovieCard";
import "./TopFavorites.css";

const TopFavorite = () => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorite(storedFavorites);
  }, []);

  return (
    <div className="favorites-container">
        <h2 className="favorite-title">Top Favorite Movies</h2>
      <div className="movie-cards-container">
        {favorite.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopFavorite;
