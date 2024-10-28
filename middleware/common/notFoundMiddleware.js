// 404 error handler
const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ success: false, message: 'Not Found' });
}

module.exports = {notFoundMiddleware}
