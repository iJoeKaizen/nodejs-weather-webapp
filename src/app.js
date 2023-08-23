const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define Path for express config
const publicPathDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handelbar engine and Views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup to serve Static pages
app.use(express.static(publicPathDir));

//Route Handler
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gideon",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    name: "Gideon",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This page provides helpful content",
    name: "Gideon",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "Kindly provide a search query",
    });

  geoCode(req.query.search, (error, { latt, longt, city } = {}) => {
    if (error)
      return res.send({
        error,
      });

    forecast(latt, longt, (error, forecast) => {
      if (error)
        return res.send({
          error,
        });

      res.send({
        city,
        location: forecast,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gideon",
    errorMsg: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Gideon",
    errorMsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
