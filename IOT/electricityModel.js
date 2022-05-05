const mongoose = require("mongoose");
const electricitySchema = new mongoose.Schema({
  payload: {
    data: {
      n: String,
      u: String,
      v: Number,
      t: Date,
    },
  },
});
module.exports = mongoose.model("Electricity", electricitySchema)