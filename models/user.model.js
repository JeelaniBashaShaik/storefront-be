
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema({
    userName: { type: String, required: true},
    userEmail: { type: String, required: true},
    userRole: { type:String, required: true },
    userPrimaryNumber: { type:Number, required: true },
    userSecondaryNumber: { type:String, required: false },
    userAddress: { type:String, required: true },
    timestamp: { type: Date, required: true}
})

module.exports = mongoose.model('users', userSchema);