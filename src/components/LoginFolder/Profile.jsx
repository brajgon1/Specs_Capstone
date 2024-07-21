import MovieCard from "../Movies/MovieCard";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile Pic"
          className="pfp"
        />
        <h1 className="username">PlaceholderUsername</h1>
      </div>
      <div className="favorite-movie-list"><MovieCard/></div>
    </div>
  );
};

export default Profile;
