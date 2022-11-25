const userRouter = require('express').Router();

const {
  getUser,
  editUser,
} = require('../controllers/users');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', editUser);

module.exports = userRouter;
