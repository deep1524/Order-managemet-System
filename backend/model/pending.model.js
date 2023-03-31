const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
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
});

const OrderModel = mongoose.model("pendingordertables", OrderSchema);

module.exports = OrderModel;
