const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../utils/JoiValidators/userValid');
const auth = require('../middleware/auth');
const cors = require('../middleware/cors');
const movieRouter = require('./movies');
const userRouter = require('./users');
const NotFoundError = require('../errors/NotFoundErr');

router.use(cors);
router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.use(auth);
router.use(movieRouter);
router.use(userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
