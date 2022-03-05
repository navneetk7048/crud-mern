const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const FoodModel = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://navneet:navneetistheboss@cluster0.hh0y1.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.send("Inserted data");
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) res.send(err);

    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
