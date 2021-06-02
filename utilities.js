const jwt = require('jsonwebtoken');
const config = require('./config');

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
    if (request.url === '/start/login' || request.url === '/start/register') {
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

module.exports = {
    joiValidate,
    sendResponse,
    verifyToken
}