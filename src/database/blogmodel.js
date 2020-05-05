const mongoose = require("mongoose");

const BlogDB = mongoose.model("Blog", {
  title: {
    type: String,
    require: true,
    trim: true,
  },
  image: {
    type: String,
    require: true,
    trim: true,
  },
  body: {
    type: String,
    require: true,
    trim: true,
  },
  created: { type: Date, default: Date.now },
});

module.exports = BlogDB;
