const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errors = require('celebrate');
require('dotenv').config();

const { PORT = 3005 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT, () => {});

app.use(helmet);
app.use(express.json());
app.use(cookieParser);

app.use(errors());
