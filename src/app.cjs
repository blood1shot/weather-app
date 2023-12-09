require("dotenv/config");
const express = require("express");
const path = require("path");
const {
  logErrors,
  clientErrorHandler
} = require("./utils/errorHandlers");
const getGeocode = require("./utils/getGeocode.js");
const getWeather = require("./utils/getWeather.js");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "ejs");

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("../views/index");
});

app.get("/about", (req, res) => {
  res.render("../views/about");
});

app.get("/help", (req, res) => {
  res.render("../views/help");
});

app.get("/weather", (req, res, next) => {
  if (req.query.address) {
    getGeocode(req.query.address, next, (data) => {
      getWeather({
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1]
      }, next, (weatherInfo) => {
        res.send(weatherInfo);
      });
    });
  } else {
    res.send({
      error: "You should provide a search query"
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).render("../views/404");
});

app.use(logErrors);
app.use(clientErrorHandler);

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
