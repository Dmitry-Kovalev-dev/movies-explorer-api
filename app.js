const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const router = require('./routes/index');
const limiter = require('./utils/rateLimit');
require('dotenv').config();

const { PORT = 3005, MONGO_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB);

app.listen(PORT, () => {
  console.log(PORT);
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
