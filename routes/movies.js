const express = require("express");
const { Movies } = require("../models/movie");
const { Genres } = require("../models/genre");
const { validateMovie } = require("../models/movie");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movies.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movies.findById({ _id: req.params.id });
  if (!movie) res.send(400).send("Movie not found");

  res.send(movie);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.findById({ _id: req.body.genreId });
  if (!genre) return res.status(400).send("Genre does not exists");

  const movie = await Movies.create({
    title: req.body.title,
    genre: {
      _id: genre.id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const movie = await Movies.findByIdAndUpdate(
    { _id: req.params.id },
    {
      numberInStock: req.body?.numberInStock,
      dailyRentalRate: req.body?.dailyRentalRate,
    },
    {new: true}
  );

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movies.findByIdAndDelete({ _id: req.params.id });
  if (!movie) return res.status(400).send("Genre does not exists.");

  res.send(movie);
});

module.exports = router;
