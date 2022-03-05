const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const FoodModel = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(
  "mongodb+srv://navneet:navneetistheboss@cluster0.hh0y1.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.get("/", async (req, res) => {
  const food = new FoodModel({ foodName: "Apple", daysSinceIAte: 5 });

  try {
    await food.save();
    res.send("Inserted data");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
