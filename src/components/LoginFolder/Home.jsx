import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import MovieCard from "../Movies/MovieCard";
import Slider from "../Slider/Slider";
import Header from "../Navigation/Header";
import supabase from "../../config/supabaseClient";
import "./Home.css";

const Home = () => {
  console.log(supabase);
  const { state, dispatch } = useAuth();
  const { authenticated } = state;
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(true);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const getRandomMovies = async (page) => {
    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      getRandomMovies(currentPage);
    }
  }, [authenticated, currentPage]);

  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  };

  const addToFavorites = (movie) => {
    console.log("Adding favorites:", movie);
    if (favorite.length < 4) {
      const favoriteList = [...favorite, movie];
      setFavorite(favoriteList);
      localStorage.setItem("favorite", JSON.stringify(favoriteList));
      console.log("favorites Stored:", favoriteList);
    } else {
      alert("Maximum number of favorites reached!");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    if (register) {
      body.email = email;
    }
    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        const { token, exp, userId, username } = res.data;
        dispatch({ type: "LOGIN", payload: { token, exp, userId, username } });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!authenticated) {
    return (
      <div className="auth-container">
        <div className="app-title-main-page">CinemaHub</div>
        <div>
          {register ? (
            <div className="register">
              <h1>Register</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Register</button>
              </form>
              <p>
                Already have an account?{" "}
                <button onClick={() => setRegister(false)}>Login</button>
              </p>
            </div>
          ) : (
            <div className="login">
              <h1>Login</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account?{" "}
                <button onClick={() => setRegister(true)}>Register</button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Header onSearch={searchMovies} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAddToWatchlist={() => addToWatchlist(movie)}
            onRemoveFromWatchlist={() => removeFromWatchlist(movie)}
            onAddToFavorites={() => addToFavorites(movie)}
          />
        ))}
      </div>
      <Slider
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
