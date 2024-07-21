import MovieCard from "../Movies/MovieCard";
import "./WatchList.css";

const WatchList = () => {
  return (
    <div className="watch-list-container">
      <h2 className="watchlist">Watchlist</h2>
      <div className="movie-cards-container">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};

export default WatchList;
