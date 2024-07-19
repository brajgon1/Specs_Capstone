import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Navigation/Header";
import Login from "./components/LoginFolder/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

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
      <Login />
    </div>
  );
}

export default App;
