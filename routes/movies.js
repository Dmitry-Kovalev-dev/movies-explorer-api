const movieRouter = require('express').Router();
const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { validateParamId } = require('../utils/validateJoi');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', saveMovie);
movieRouter.delete('/movies/:id', validateParamId, deleteMovie);

module.exports = movieRouter;
