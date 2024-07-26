// import MovieCard from "../Movies/MovieCard";
// import WatchList from "../Watchlist/Watchlist";
import TopFavorite from "../Favorites/TopFavorites";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import "./Profile.css";

const Profile = () => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!authenticated ? (
        <div>Please log in to view your profile.</div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Pic"
              className="pfp"
            />
            <h1 className="username">PlaceholderUsername</h1>
          </div>
          <div className="favorite-movie-list">Favorite Movies</div>
          <TopFavorite />
        </div>
      )}
    </div>
  );
};

export default Profile;
