const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundErr');
const ForbiddenError = require('../errors/ForbiddenErr');
const BadRequestErr = require('../errors/BadRequestErr');
const Movie = require('../models/movie');
const { errMessages } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

const saveMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({
    ...req.body,
    owner: _id,
  })
    .then(() => {
      res.send('Saved!');
    })
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Movie.findById({ id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errMessages.movieIdNotFound);
      }
      if (_id !== movie.owner.toString()) {
        throw new ForbiddenError(errMessages.unavailable);
      }
      Movie.findByIdAndRemove(id)
        .then(() => res.send({ message: 'Фильм удален из Сохраненных.' }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestErr(errMessages.idIncorrect));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  saveMovie,
  deleteMovie,
};
