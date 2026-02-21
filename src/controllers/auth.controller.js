const { StatusCodes } = require("http-status-codes");
const authService = require("../services/auth.service");

async function register(req, res) {
    try {
        console.log('register');
        
        const result = await authService.createUser(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            data: result,
            error: null,
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        return res.status(StatusCodes.OK).json({
            success: true,
            data: result,
            error: null,
        });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: null,
            error: error.message,
        });
    }
}

module.exports = { register, login };
