const { AppError } = require('../../libs/errorLib');

function errorHandler(err, req, res, next) {
  // Log the error to the console with red color
  console.log('\x1b[31m', err); 
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error : 'Internal Server Error' });
  }
}

module.exports = errorHandler
