const bodyParser = require("body-parser"),
  express = require("express"),
  methodOverride = require("method-override"),
  app = express(),
  expressSanitizer = require("express-sanitizer"),
  BlogDB = require("./database/blogmodel");
require("./database/mongoose");

////--------------------------------Setting
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
////--------------------------------ROUTES
//HOME ROUTE
app.get("/", async (req, res) => {
  res.redirect("/blogs");
});
//INDEX ROUTE
app.get("/blogs", (req, res) => {
  BlogDB.find({}, (err, blogs) => {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});
//NEW ROUTE
app.get("/blogs/new", (req, res) => {
  res.render("create");
});
//CREATE ROUTE
app.post("/blogs", async (req, res) => {
  const task = new BlogDB(req.body.blog);

  try {
    await task.save();
    // res.status(201);
    res.redirect("/blogs");
  } catch {
    res.render("index");
  }
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
  BlogDB.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
  BlogDB.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  BlogDB.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//DELETE
app.delete("/blogs/:id", async (req, res) => {
  try {
    const blog = await BlogDB.findByIdAndDelete(req.params.id);

    if (!blog) {
      res.status(404).send();
    }

    res.redirect("/blogs");
  } catch (e) {
    res.status(500).send();
  }
});

//--------------------------------PORT
app.listen(process.env.PORT || 3000, () => {
  console.log("Blog Application Server Start!");
});
