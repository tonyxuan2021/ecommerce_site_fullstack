const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
require("dotenv").config();

// import routes

const userRoutes = require("./routes/user");

// db
mongoose.connect(process.env.DATABASE, () => {
  console.log("connected to DB!");
});

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(expressValidator());

// routes middlware
app.use("/api", userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
