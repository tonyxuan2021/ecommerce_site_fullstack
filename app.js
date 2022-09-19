const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

// import routes

const userRoutes = require("./routes/user");

// db
mongoose.connect(process.env.DATABASE, () => {
  console.log("connected to DB!");
});

// routes middlware
app.use("/api", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
