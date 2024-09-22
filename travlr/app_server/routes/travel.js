var express = require("express");
var router = express.Router();
var controller = require("../controllers/travel");
var fs = require("fs");
var trips = JSON.parse(fs.readFileSync(`./data/trips.json`, `utf8`));

const travel = (req, res) => {
  res.render("travel", { title: "Travlr Getaways", trips });
};

module.exports = travel;
