const express = require("express");
const CompleteModel = require("../model/complete.model");

const app = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/", async (req, res) => {
  CompleteModel.find({})
    .then((orders) => {
      res.send(orders);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.post("/", async (req, res) => {
  let Category = req.body.Category;
  let Qty = req.body.Qty;
  let Price = req.body.Price;

  let newsprint = new CompleteModel({
    Category,
    Qty,
    Price,
  });
  newsprint.save().then((sprintdoc) => {
    res.send(sprintdoc);
  });
});

module.exports = app;
