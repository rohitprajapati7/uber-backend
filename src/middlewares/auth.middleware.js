const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const { StatusCodes } = require("http-status-codes");

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            data: null,
            error: "Access denied. No token provided.",
        });
    }
    try {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            data: null,
            error: "Invalid or expired token.",
        });
    }
}

module.exports = { authenticate };
