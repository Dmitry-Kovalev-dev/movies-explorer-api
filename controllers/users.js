const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATED,
  SECRET_KEY,
  mongoErrorCode,
  errMessages,
  messages,
} = require('../utils/constants');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const NotFoundError = require('../errors/NotFoundErr');
const BadRequestError = require('../errors/BadRequestErr');
const ConflictError = require('../errors/ConflictErr');
const UnauthorizedError = require('../errors/UnauthorizedErr');

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send(user);
    })
    .catch(next);
};

const editUser = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { email, name },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errMessages.updateUserBadReq));
      } else if (err.code === mongoErrorCode) {
        next(new ConflictError(errMessages.emailConflict));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, name } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errMessages.createUserBadReq));
      } else if (err.code === mongoErrorCode) {
        next(new ConflictError(errMessages.emailConflict));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errMessages.unauthorized);
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errMessages.unauthorized);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
            { expiresIn: '7d' },
          );
          res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          });
          res.send(user);
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('token').send({ message: messages.out });
};

module.exports = {
  getUser,
  editUser,
  createUser,
  login,
  signout,
};
