const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

// db
mongoose.connect(process.env.DATABASE, () => {
  console.log("connected to DB!");
});

// routes
app.get("/", (req, res) => {
  res.send("Hello from node");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
