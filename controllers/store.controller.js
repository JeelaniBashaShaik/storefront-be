const Store = require('./../models/store.model');
const joiSchemas = require('./../joiSchemas');
const utilities = require('./../utilities');

const addStore = (request, response) => {
    const storeRequest = request.body;
    const { hasError, errorMessage } = utilities.joiValidate(joiSchemas.store, storeRequest);
    if (hasError) {
        utilities.sendResponse(response, {}, errorMessage);
    } else {
        const store = new Store({...request.body});
        store.save((error, payload) => {
            if (error) {
                return utilities.sendResponse(response, {}, 'store-add-error');
            }
            utilities.sendResponse(response, payload._doc);
        });
    }
}

const getStore = async (request, response) => {
    const storeId = request.params.storeId;
    const store = await Store.findOne({storeId});
    if (store) {
        utilities.sendResponse(response, store._doc);
    } else {
        utilities.sendResponse(response, {}, 'store-fetch-error');
    }
}

const updateStore = async (request, response) => {
    const storeId = request.params.storeId;
    const store = await Store.findOneAndUpdate({storeId}, {...request.body}, {returnOriginal: false});
    if (store) {
        utilities.sendResponse(response, store._doc);
    } else {
        utilities.sendResponse(response, {}, 'store-update-error');
    }
}

const deleteStore = async (request, response) => {
    const storeId = request.params.storeId;
    const store = await Store.findOneAndDelete({storeId});
    if (store) {
        utilities.sendResponse(response, {success: true});
    } else {
        utilities.sendResponse(response, {}, 'store-delete-error');
    }
}

const getAllStores = async (request, response)  => {
    const storePincode = request.params.storePincode;
    const allStores = await Store.find({storePincode});
    if (allStores.length) {
        utilities.sendResponse(response, allStores);
    } else {
        utilities.sendResponse(response, {}, 'stores-fetch-error');
    }
}

const getUserStores = async (request, response) => {
    const userLinkedNumber = request.params.userLinkedNumber;
    const allStores = await Store.find({userLinkedNumber});
    if (allStores.length) {
        utilities.sendResponse(response, allStores);
    } else {
        utilities.sendResponse(response, {}, 'stores-fetch-error');
    }
}


module.exports = {
    addStore,
    getStore,
    updateStore,
    deleteStore,
    getAllStores,
    getUserStores
}