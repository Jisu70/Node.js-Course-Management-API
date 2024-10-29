const jwt = require('jsonwebtoken');
const { UnauthorizedError, UnhandledError } = require('../libs/errorLib');

/**
 * This middleware function is used to authorize the user.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authorizeUser = (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
      return next(new UnauthorizedError("Authorization token is required"));
    }
    let token = authorization.split(" ")[1];
    if (!token) {
      return next(new UnauthorizedError("Authorization token is required"));
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        next(new UnhandledError("Authorization token is invalid"));
    }
};

module.exports = { authorizeUser };
