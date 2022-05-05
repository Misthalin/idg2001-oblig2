require("dotenv").config();

const connectDB = require("./connectDB");
const express = require("express");
const TemperatureModel = require("./temperatureModel");

const app = express();
const PORT = process.env.PORT || 5050;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/temperatures", async (req, res) => {
  try {
    const temperatures = await TemperatureModel.find();
    res.status(200);
    res.json({ temperatures });
  } catch (error) {
    res.status(500)
    res.send("There was a server error when fetching temperatures");
  }
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
