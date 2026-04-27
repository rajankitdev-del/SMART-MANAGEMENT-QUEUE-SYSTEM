const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  name: String,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Queue", QueueSchema);