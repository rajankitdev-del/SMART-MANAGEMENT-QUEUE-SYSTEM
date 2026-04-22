const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  tokenNumber: Number,
  userId: String,
  queueId: String,
  status: {
    type: String,
    default: "waiting"
  }
});

module.exports = mongoose.model("Token", TokenSchema);