const Joi = require('@hapi/joi');

const userJoiSchema = Joi.object().keys({
    userName: Joi.string().required(),
    userEmail: Joi.string().required(),
    userRole: Joi.string().required(),
    userPrimaryNumber: Joi.string().required(),
    userSecondaryNumber: Joi.string(),
    userAddress: Joi.string(),
    userPassword: Joi.string().required()
});

const storefrontInventoryJoiSchema = Joi.object().keys({
    skuId: Joi.string().required(),
    skuName: Joi.string().required(),
    skuDescription: Joi.string().required(),
    skuImageUrl: Joi.string(),
    skuMeasure: Joi.string().required(),
    skuTags: Joi.string().required(),
    skuPricePerMeasure: Joi.string(),
    skuCategory: Joi.string().required(),
    skuVisible: Joi.string()
})

module.exports = {
    userJoiSchema,
    storefrontInventoryJoiSchema
}