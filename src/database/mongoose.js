const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blog-application", {
  // mongoose.connect(
  //   "mongodb+srv://sun:<sungfdgmr123>@blogapp-i1zi8.gcp.mongodb.net/test?retryWrites=true&w=majority",
  // {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
