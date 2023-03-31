const express = require("express");
const OrderModel = require("../model/pending.model");

const app = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  // We want to return an array of all the lists that belong to the authenticated user
  OrderModel.find({})
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

  let newsprint = new OrderModel({
    Category,
    Qty,
    Price,
  });
  newsprint.save().then((sprintdoc) => {
    res.send(sprintdoc);
  });
});

app.delete("/:id", (req, res) => {
  OrderModel.findOneAndRemove({
    _id: req.params.id,
  }).then((removedSprintDoc) => {
    res.send(removedSprintDoc);
  });
});

module.exports = app;
