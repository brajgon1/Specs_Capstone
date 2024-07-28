import "./App.css";
// import axios from "axios";
// import { useState } from "react";
import Header from "./components/Navigation/Header";
import Home from "./components/LoginFolder/Home";
import Profile from "./components/LoginFolder/Profile";
import WatchList from "./components/Watchlist/Watchlist";
// import TopFavorite from "./components/Favorites/TopFavorites"
import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
