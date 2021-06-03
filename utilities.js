const jwt = require('jsonwebtoken');
const config = require('./config');
const joiSchemas = require('./joiSchemas');

const joiValidate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        return { hasError: true, errorMessage:error.details[0].message };
    }
    return { hasError: false, errorMessage: '' };
}

const sendResponse = (response, payload = {}, errorMessage = '') => {
    if (payload && !errorMessage) {
        response.json({ success: true, ...payload });
    } else {
        response.json({ success: false, errorMessage });
    }
}

const verifyToken = (request, response, next) => {
    if (config.bypassEndpoints.includes(request.url)) {
        next(); // bypass for login route and register
    } else {
        let token = request.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, (error) => {
                if (error) {
                    sendResponse(response, {}, 'invalid-token')
                } else {
                    next();
                }
            })
        } else {
            sendResponse(response, {}, 'no-token')
        }
    }
}

const validateSku = (skuList) => {
    let errorRows = [];
    let successRows = [];
    skuList.forEach((sku, index) => {
        const { hasError, errorMessage } = joiValidate(joiSchemas.storefrontInventoryJoiSchema, sku);
        if (hasError) {
            errorRows.push({skuId: sku.skuId, skuName: sku.skuName, errorMessage, row: index + 1});
        } else {
            sku.skuTags = sku.skuTags.split(',');
            successRows.push({...sku});
        }
    });
    return {errorRows, successRows};
}

module.exports = {
    joiValidate,
    sendResponse,
    verifyToken,
    validateSku
}