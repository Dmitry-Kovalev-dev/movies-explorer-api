const movieRouter = require('express').Router();
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { validateSaveMovie, validateParamId } = require('../utils/JoiValidators/movieValid');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validateSaveMovie, saveMovie);
movieRouter.delete('/movies/:_id', validateParamId, deleteMovie);

module.exports = movieRouter;
