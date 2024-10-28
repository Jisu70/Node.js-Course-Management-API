const {  validationResult } = require("express-validator");

/**
 * 
 *  This middleware function is used to retun th error using express validator.
 */
const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message : errors.array()[0].msg });
    }
    next()
}

module.exports = { validationHandler }