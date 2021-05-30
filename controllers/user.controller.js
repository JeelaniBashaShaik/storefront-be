const User = require('./../models/user.model');
const utilities = require('./../utilities');
const joiSchemas = require('./../joiSchemas');

const getUser = async (request, response) => {
    const user = await User.findOne({ userEmail: request.params.email }, { timestamp: 0, _id: 0 });
    if (user) {
        utilities.sendResponse(response, user);  
    } else {
        utilities.sendResponse(response, {} , 'User not found');       
    }
}

const createUser = (request, response) => {
    const userRequest = request.body;
    const { hasError, errorMessage } = utilities.joiValidate(joiSchemas.userJoiSchema, userRequest);
    if (hasError) {
        utilities.sendResponse(response, {}, errorMessage);
    } else {
        const user = new User({ timestamp: new Date(), ...request.body });
        user.save((error, payload) => utilities.sendResponse(response, payload, error));
    }
}

const updateUser = async (request, response) => {
    const userEmail = request.body.userEmail;
    const userToUpdate = await User.findOne({ userEmail });
    if (userToUpdate) {
        User.updateOne({...request.body}, (error, payload) => {
            utilities.sendResponse(response, payload, error);
        })    
    } else {
        utilities.sendResponse(response, {}, 'User not found');
    }
}

const deleteUser = async (request, response) => {
    const userEmail = request.params.email;
    const userToDelete = await User.findOne({ userEmail });
    if (userToDelete) {
        User.deleteOne({ userEmail }, (error, payload) => {
            utilities.sendResponse(response, payload, error);
        })    
    } else {
        utilities.sendResponse(response, {}, 'User not found');
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}