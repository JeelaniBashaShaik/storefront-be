const mongoose = require('mongoose');
const schema = mongoose.Schema;

let inventorySchema = new schema({
    skuId: { type: String, required: true },
    skuName: { type: String, required: true },
    skuDescription: { type: String, required: true },
    skuImageUrl: { type: String, required: false },
    skuMeasure: { type: String, required: true },
    skuTags: { type: Array, required: true },
    skuPricePerMeasure: { type: Number, required: false },
    skuCategory: { type: String, required: false },
    skuVisible: { type: Boolean, requried: false }
})

module.exports = mongoose.model('storefront-inventory', inventorySchema);