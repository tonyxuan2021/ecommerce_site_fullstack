const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressjwt = require("express-jwt"); // for authorization check

exports.signup = async (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status.json({
        err: "User with that email does not exist. Please sign up",
      });
    }
    // if user is found, make sure the email and password match
    // create authenticate method in user model

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as "t" in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
