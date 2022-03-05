const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(
  "mongodb+srv://navneet:navneetistheboss@cluster0.hh0y1.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
