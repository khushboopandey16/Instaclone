const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  file: { type: String },
  author: { type: String },
  description: { type: String },
  location: { type: String },
  likes: { type: Number, default: Math.floor(Math.random() * 10001) },
  Createdat: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("userData", userSchema);
