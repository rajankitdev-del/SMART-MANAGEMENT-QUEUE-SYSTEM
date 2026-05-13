const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: {
   type: String,
   index: true
}
});

module.exports = mongoose.model("User", UserSchema);