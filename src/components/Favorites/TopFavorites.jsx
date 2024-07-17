import React, { useState } from "react";

const TopFavorite = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (movie) => {
    if (favorites.length < 4 && !favorites.find((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const handleRemoveFavorite = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId));
  };

  return (
    <div>
      <div className="favorite-list"></div>
    </div>
  );
};

export default TopFavorite;
