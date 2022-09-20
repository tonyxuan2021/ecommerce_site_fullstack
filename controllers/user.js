const User = require("../models/user");

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
