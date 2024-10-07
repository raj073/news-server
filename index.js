const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const categories = require("./data/categories.json");
const news = require("./data/news.json");

//app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.get("/", (req, res) => {
  res.send("News Server API is Running");
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/category/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (id === "08") {
    res.send(news);
    console.log(news);
  } else {
    const category_news = news.filter((n) => n.category_id === id);
    res.send(category_news);
    console.log(category_news);
  }
});

app.get("/news", (req, res) => {
  res.send(news);
});

app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  const selectedNews = news.find((n) => n._id === id);
  res.send(selectedNews);
});

app.listen(port, () => {
  console.log("News Server Running on PORT:", port);
});
