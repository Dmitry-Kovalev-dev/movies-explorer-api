const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundErr');
const ForbiddenError = require('../errors/ForbiddenErr');
const BadRequestErr = require('../errors/BadRequestErr');
const Movie = require('../models/movie');
const { errMessages, messages } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({
    ...req.body,
    owner: _id,
  })
    .then(() => {
      res.send({ message: messages.saved });
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  // const { _id } = req.user;
  // const { id } = req.params;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errMessages.movieIdNotFound);
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(errMessages.unavailable);
      }
      Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: messages.deleted }))
        .catch(next);
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
