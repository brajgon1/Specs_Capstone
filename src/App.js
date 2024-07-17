import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Navigation/Header";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);

  const getAllMovies = () => {
    {
      const apiKey = process.env.REACT_APP_API_KEY;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        )
        .then((res) => {
          setMovies(res.data.results);
        });
    }
  };

  useEffect(() => {
    getAllMovies();
  }, [page]);

  return <div className="App"><Header/></div>;
}

export default App;
