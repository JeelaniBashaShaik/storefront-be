let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./../models/user.model');
const config = require('./../config');
const utilities = require('./../utilities');
const UserController = require('./user.controller');

const loginUser = async (request, response) => {
    const { userPrimaryNumber, userPassword: passwordFromUser } = request.body;
    const user = await User.findOne({ userPrimaryNumber });
        if (!user) {
            utilities.sendResponse(response, {} , 'login-error');       
        } else if (user !== null) {
            const { userPassword: hashedPassword } = user;
            const isGenuineUser = await bcrypt.compare(passwordFromUser, hashedPassword);
            if (isGenuineUser) {
                const token = jwt.sign({ userPrimaryNumber }, config.secret, { expiresIn: "2h" });
                utilities.sendResponse(response, { ...user._doc, userPassword: null, token });       
            } else {
                utilities.sendResponse(response, {} , 'username-password-incorrect');       
            }
        } else {
            utilities.sendResponse(response, {} , 'user-not-found');       
        }
}

const registerUser = (request, response) => {
    UserController.createUser(request, response);
}

module.exports = {
    loginUser,
    registerUser
}