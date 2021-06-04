const mongoose = require('mongoose');
const schema = mongoose.Schema;

let storeSchema = new schema({
    storeName: { type: String, required: true },
    storeEmail: { type: String, required: true },
    storePrimaryNumber: { type:Number, required: true },
    storeSecondaryNumber: { type:Number, required: false },
    storeAddress: { type:String, required: true },
    storeId: { type:String, required: true },
    storeImageUrl: { type: String, required: false},
    storeType: { type: String, required: true},
    storePincode: { type: String, required: true}
})

module.exports = mongoose.model('stores', storeSchema);