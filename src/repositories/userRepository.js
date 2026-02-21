const User = require("../models/user");

async function createUser(user) {
    try {
        const res = await User.create(user);
        return res;
    } catch (error) {
        throw error;
    }
}

async function getUser() {}

module.exports = { createUser, getUser };
