const mongoose = require("mongoose");

mongoose.connect(
  // "mongodb+srv://sun:123@blogapp-i1zi8.gcp.mongodb.net/test?retryWrites=true&w=majority",
  "mongodb://sun:sun123@ds247674.mlab.com:47674/heroku_stp7r7cl",
  // || "mongodb://127.0.0.1:27017/blog-application"
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
