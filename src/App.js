import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Navigation/Header";
import Home from "./components/LoginFolder/Home";
import Profile from "./components/LoginFolder/Profile";
import Rating from "./components/Rating/Rating";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  // const [favorites, setFavorites] = useState([]);

  const getData = () => {
    {
      const apiKey = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        )
        .then((res) => {
          console.log(res.data.results);
          setMovies(res.data.results);
        });
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Rating /> */}
    </div>
  );
}

export default App;
