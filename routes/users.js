const userRouter = require('express').Router();
const { getUser, editUser, signout } = require('../controllers/users');
const { validateUpdateUser } = require('../utils/JoiValidators/userValid');

userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', validateUpdateUser, editUser);
userRouter.get('/signout', signout);

module.exports = userRouter;
