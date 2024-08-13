const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;

// controllers
const { register, login } = require("./controllers/authController");
const { getUsers } = require("./controllers/userController");
const { getWatchlist, saveWatchlist, deleteFromWatchlist } = require("./controllers/watchlistController");
const { getFavorites, saveFavorites, deleteFromFavorites } = require("./controllers/favoriteController");

//middlewares
const isAuthenticated = require('./middleware/isAuthenticated')

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// routes
app.post("/register", register);
app.post("/login", login);
app.get("/users", isAuthenticated, getUsers);
app.get("/watchlist", getWatchlist);
app.post("/watchlist", saveWatchlist);
app.delete("/watchlist", deleteFromWatchlist);
app.get("/favorites", getFavorites)
app.post("/favorites", saveFavorites)
app.delete("/favorites", deleteFromFavorites);

// server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));