// import { Navlink } from "react-router-dom";
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
            <a href="/">Profile</a>
          </li>
          <li>
            <a href="/about">Watchlist</a>
          </li>
          <li>
            <a href="/contact">Movies</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
