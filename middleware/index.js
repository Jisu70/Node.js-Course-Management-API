const errorHandler = require("./common/errorHandlerMiddleware")
const { notFoundMiddleware } = require("./common/notFoundMiddleware")
module.exports = {
    errorHandler,
    notFoundMiddleware
}