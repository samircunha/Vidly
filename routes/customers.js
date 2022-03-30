const express = require("express");
const router = express.Router();

const { Customer } = require("../models/customer");
const { validateCustomer } = require("../models/customer");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});
router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();

  res.send(customer);
});
router.put("/", async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    { _id: req.params.id },
    { phone: req.body?.phone },
    { new: true }
  );

  res.send(customer);
});

module.exports = router;
