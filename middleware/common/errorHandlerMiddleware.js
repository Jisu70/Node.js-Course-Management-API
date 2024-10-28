// errorHandler.js

const { AppError } = require('../../libs/errorLib');

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error : 'Internal Server Error' });
  }
}

module.exports = errorHandler
