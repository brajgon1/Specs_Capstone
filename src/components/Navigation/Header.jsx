import { Navlink } from "react-router-dom";

const Header = () => {
  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#f57145" : "",
    };
  };

  return <h2>Header</h2>;
};

export default Header;
