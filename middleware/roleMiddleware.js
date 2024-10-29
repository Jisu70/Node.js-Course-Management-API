/**
 * This middleware function is used to authorize the admin only
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
};

/**
 * This middleware function is used to authorize the member only
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const authorizeMember = (req, res, next) => {
    if (req.user.role !== "member") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
};

module.exports = { authorizeAdmin, authorizeMember };
