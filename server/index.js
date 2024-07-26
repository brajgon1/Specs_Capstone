const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;

// controllers
const { register, login } = require("./controllers/authController");
const { getUsers } = require("./controllers/userController");

//middlewares
const isAuthenticated = require('./middleware/isAuthenticated')

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// routes
app.post("/register", register);
app.post("/login", login);
app.get("/users", isAuthenticated, getUsers);

// server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
