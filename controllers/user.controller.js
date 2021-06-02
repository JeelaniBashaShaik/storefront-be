const bcrypt = require('bcrypt');

const User = require('./../models/user.model');
const utilities = require('./../utilities');
const config = require('./../config');
const joiSchemas = require('./../joiSchemas');

const getUser = async (request, response) => {
    const user = await User.findOne({ userEmail: request.params.email }, { timestamp: 0, _id: 0, userPassword: 0, __v: 0 });
    if (user) {
        utilities.sendResponse(response, user._doc);  
    } else {
        utilities.sendResponse(response, {} , 'user-not-found');       
    }
}

const createUser = async (request, response) => {
    const userRequest = request.body;
    const { hasError, errorMessage } = utilities.joiValidate(joiSchemas.userJoiSchema, userRequest);
    if (hasError) {
        utilities.sendResponse(response, {}, errorMessage);
    } else {
        const passwordHash = await bcrypt.hash(userRequest.userPassword, config.saltRounds);
        const user = new User({ timestamp: new Date(), ...request.body, userPassword: passwordHash });
        user.save((error, payload) => {
            if (error) {
               return utilities.sendResponse(response, {}, 'register-user-error');
            }
            utilities.sendResponse(response, { success: true });
        });
    }
}

const updateUser = async (request, response) => {
    const userEmail = request.body.userEmail;
    const userToUpdate = await User.findOne({ userEmail });
    if (userToUpdate) {
        User.updateOne({...request.body}, (error, payload) => {
            utilities.sendResponse(response, payload._doc, error);
        })    
    } else {
        utilities.sendResponse(response, {}, 'user-not-found');
    }
}

const deleteUser = async (request, response) => {
    const userEmail = request.params.email;
    const userToDelete = await User.findOne({ userEmail });
    if (userToDelete) {
        User.deleteOne({ userEmail }, (error, payload) => {
            utilities.sendResponse(response, { success: true }, error);
        })    
    } else {
        utilities.sendResponse(response, {}, 'user-not-found');
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}