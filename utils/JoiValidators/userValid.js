const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../../errors/BadRequestErr');
const { errMessages } = require('../constants');

const urlValid = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new BadRequestError(errMessages.incorrectUrl);
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateParamId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateSaveMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValid),
    trailerLink: Joi.string().required().custom(urlValid),
    thumbnail: Joi.string().required().custom(urlValid),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateLogin,
  validateRegister,
  validateParamId,
  validateUpdateUser,
  validateSaveMovie,
};
