const { Schema, model } = require("mongoose");

const CompleteSchema = new Schema(
  {
    Category: {
      type: String,
      enum: ["Buyer", "Seller"],
      default: "Buyer",
    },
    Qty: {
      type: Number,
    },
    Price: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

const CompleteModel = model("completetable", CompleteSchema);

module.exports = CompleteModel;
