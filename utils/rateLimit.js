const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000000,
  max: 30000000,
});

module.exports = limiter;
