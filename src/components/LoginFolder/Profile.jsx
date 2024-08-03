import TopFavorite from "../Favorites/TopFavorites";
import Header from "../Navigation/Header";
import { useAuth } from "../../store/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Profile.css";

const Profile = () => {
  const { state } = useAuth();
  const { authenticated, username } = state;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Authenticated: ", authenticated);
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Header />
      <div className="profile-container">
        <div className="profile-header">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile Pic"
            className="pfp"
          />
          <h1 className="username">{username}</h1>
        </div>
        <div className="favorite-movie-list">
          <TopFavorite />
        </div>
      </div>
    </div>
  );
};

export default Profile;
