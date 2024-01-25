const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
},{timestamps : true});

module.exports = new mongoose.model("visitermessages", userData);
