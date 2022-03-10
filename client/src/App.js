import { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

const App = () => {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);

  const [foodList, setFoodList] = useState([]);
  const [newFood, setNewFood] = useState("");

  useEffect(() => {
    Axios.get("/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);

  const addToList = () => {
    Axios.post("/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    Axios.put("/update", {
      id: id,
      newFood: newFood,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>

      <label>Food Name:</label>
      <input
        type="text"
        onChange={(event) => setFoodName(event.target.value)}
      />
      <label>Days Since You Ate It::</label>
      <input type="number" onChange={(event) => setDays(event.target.value)} />
      <button onClick={addToList}>Add to list</button>

      <h1>Food List</h1>

      {foodList.map((val, key) => {
        return (
          <div key={key} className="food-item">
            <h2>{val.foodName}</h2>
            <input
              type="text"
              placeholder="enter new food..."
              onChange={(event) => setNewFood(event.target.value)}
            />
            <h2>{val.daysSinceIAte}</h2>
            <input type="number" placeholder="enter new day..." />
            <button onClick={() => updateFood(val._id)}>Submit</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
