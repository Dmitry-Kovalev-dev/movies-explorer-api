const { SERV_ERROR, errMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode ? err.statusCode : SERV_ERROR)
    .send({ message: err.statusCode !== 500 ? err.message : errMessages.serverError });
  next();
};

module.exports = errorHandler;
