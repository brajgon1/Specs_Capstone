const Profile = () => {
  return (
    <div>
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile Pic" className="pfp" />
        <h1 className="username">{}</h1>
      </div>
      <div className="favorite-movie-list">{}</div>
      <div className="recent-activity-feed">{}</div>
    </div>
  );
};

export default Profile;
