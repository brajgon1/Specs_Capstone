const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// routes
app.post('/register', register);
app.post('/login', login);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
