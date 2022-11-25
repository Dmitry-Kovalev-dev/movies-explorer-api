// const mongoose = require('mongoose');
const Movie = require('../models/movie');
// const { errMessages } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

const saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then(() => {
      res.send('Saved!');
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  saveMovie,
};
