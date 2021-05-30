const joiValidate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        return { hasError: true, errorMessage:error.details[0].message };
    }
    return { hasError: false, errorMessage: '' };
}

const sendResponse = (response, payload = {}, errorMessage = '') => {
    if (payload && !errorMessage) {
        response.json({ success: true, ...payload._doc});
    } else {
        response.json({ success: false, errorMessage });
    }
}

module.exports = {
    joiValidate,
    sendResponse
}