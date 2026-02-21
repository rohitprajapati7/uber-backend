const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const userRepository = require("../repositories/userRepository");
const User = require("../models/user");

async function createUser(data) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");
    const user = await userRepository.createUser(data);
    return user;
}

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");
    const isMatch = await user.camparePassword(password);
    if (!isMatch) throw new Error("Invalid email or password");
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "24h",
    });
    return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token };
}

module.exports = { createUser, loginUser };
