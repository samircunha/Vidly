const express = require("express");
const bcrypt = require("bcryptjs");
const { Users } = require("../models/users");
const { validateAuth } = require("../models/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid e-mail or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid e-mail or password");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send("Logged");
});

module.exports = router;
