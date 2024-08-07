import { NavLink } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#a1caa1" : "",
    };
  };

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <header className="header">
      <div className="name-of-app">
        <h2 className="app-title">CineHub</h2>
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
          <input
            type="text"
            placeholder="Search movies..."
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
