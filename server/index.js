const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`listening on ${PORT}`));
