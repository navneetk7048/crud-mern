const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const FoodModel = require("./models/Food");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production")
  app.use(express.static("client/build"));

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

app.put("/update", async (req, res) => {
  const newFood = req.body.newFood;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      if (err) res.send(err);

      updatedFood.foodName = newFood;
      updatedFood.save();
      res.send("updated");
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
