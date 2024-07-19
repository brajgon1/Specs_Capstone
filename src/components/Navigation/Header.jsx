import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#f57145" : "",
    };
  };

  return (
    <header className="header">
      <div className="name-of-app">
        <h2>CineHub</h2>
      </div>
      <nav className="header-nav">
        <ul className="main-nav">
          <li>
            <NavLink style={styleActiveLink} to="/" >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/about" >
              Watchlist
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/movies" >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
