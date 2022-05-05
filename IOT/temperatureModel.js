const mongoose = require("mongoose");
const temperatureSchema = new mongoose.Schema({
  payload: {
    data: {
      n: String,
      u: String,
      v: Number,
      t: Date,
    },
  },
});
module.exports = mongoose.model("Temperature", temperatureSchema)