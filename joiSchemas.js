const Joi = require('@hapi/joi');

const userJoiSchema = Joi.object().keys({
    userName: Joi.string().required(),
    userEmail: Joi.string().required(),
    userRole: Joi.string().required(),
    userPrimaryNumber: Joi.string().required(),
    userSecondaryNumber: Joi.string(),
    userAddress: Joi.string().required()
});

module.exports = {
    userJoiSchema,
}