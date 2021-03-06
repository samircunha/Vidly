const express = require("express");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/users");
const { validateUser } = require("../models/users");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User alredy register");

  user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body?.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  await user.save();

  res
    .header("x-auth-token", token)
    .send({ _id: user._id, name: user.name, email: user.email });
});

module.exports = router;
