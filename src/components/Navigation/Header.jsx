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
            <NavLink style={styleActiveLink} to="/home" >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/profile" >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink style={styleActiveLink} to="/watchlist" >
              Watchlist
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
