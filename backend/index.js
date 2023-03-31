const express = require("express");
const connection = require("./config/db");
const OrderRouter=require("./route/pending.route");
const CompleteRouter=require("./route/complete.route");
require("dotenv").config()
const cors=require("cors");
const app = express();
app.use(cors({
  origin:"*",
}))
app.use(express.json());


app.use("/orders",OrderRouter);
app.use("/complete",CompleteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;

    console.log("connection established");
  } catch (err) {
    res.send("something went wrong");
    console.log(err);
  }
  console.log(`listening on port ${process.env.port}`);
});
