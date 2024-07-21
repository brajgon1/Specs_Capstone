import React, { useState } from "react";
import "./TopFavorites.css"

const TopFavorite = () => {
  return (
    <div className="favorites-container">
      <h2 className="favorites">Favorites</h2>
      <div className="movie-cards-container"></div>
    </div>
  );
};

export default TopFavorite;
