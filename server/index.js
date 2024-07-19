const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;
// const { getMovies } = require('./controllers/movieController')

app.use(cors());
app.use(express.json());

// routes
app.post('/register', register);
app.post('/login', login);

// app.get('/api/movie', getMovies);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
