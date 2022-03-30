const express = require("express");
const router = express.Router();

const { Customer } = require("../models/customer");
const { Movies } = require("../models/movie");
const { Rentals } = require("../models/rentals");
const { validateRental } = require("../models/rentals");

router.get("/", async (req, res) => {
  const rentals = await Rentals.find();
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({ _id: req.body.customerId });
  if (!customer) return res.status(400).send("Invalid customer");

  const movie = await Movies.findOne({ _id: req.body.movieId });
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock == 0)
    return res.status(400).send("Movie not in stock");

  let rental = new Rentals({
    customer: {
      name: customer.name,
      isGold: customer.isGold,
      _id: customer._id,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      _id: movie._id,
    },
  });

  const session = await Rentals.startSession();
  session.startTransaction();

  try{
      rental = await rental.save();

      movie.numberInStock--;
      movie.save();

      await session.commitTransaction();
      session.endSession();

      res.send(rental);
  } catch(ex){
      session.abortTransaction();
      session.endSession();

      return res.status(500).send(ex.message);
  }
});

module.exports = router;
