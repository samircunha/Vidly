const express = require("express");
const auth = require("../middlewares/auth");
const { Genres } = require("../models/genre");
const { genreValidate } = require("../models/genre");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genres.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById({ _id: req.params.id });
  if (!genre) res.send(400).send("Genre not found");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = genreValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genres.findOne({ name: req.body.name });
  if (genre) return res.status(400).send("Genre alredy exists");

  genre = await Genres.create({ name: req.body.name });
  genre.save();

  res.send(genre);
});

router.delete("/:id", auth, async (req, res) => {
  const genre = await Genres.findByIdAndDelete({ _id: req.params.id });
  if (!genre) return res.status(400).send("Genre does not exists.");

  res.send(genre);
});

module.exports = router;
