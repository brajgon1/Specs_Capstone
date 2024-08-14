import { NavLink } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#ffe4c4" : "",
    };
  };

  const [search, setSearch] = useState("");
  // const [searchType, setSearchType] = useState("movies")

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // const handleSearchTypeChange = (e) => {
  //   setSearchType(e.target.value);
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
      // add searchType as am argument in the onSearch event
    }
  };

  return (
    <header className="header">
      <div className="name-of-app">
        <h2 className="app-title">CinemaHub</h2>
      </div>
      <nav className="header-nav">
        <ul className="main-nav">
          <li>
            <NavLink style={styleActiveLink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/watchlist">
              Watchlist
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          {/* <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="movies">Movies</option>
            <option value="actors">Actors</option>
            <option value="genres">Genres</option>
          </select> */}
          <input
            type="text"
            placeholder='Search for movies... '
            // placeholder={`Search ${searchType}...`} <--- add this when working on the updated 
            value={search}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
