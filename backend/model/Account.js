const mongoose = require('mongoose')
const { User } = require('./User.model')
const accountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})


const Account = mongoose.model('Account', accountSchema)

module.exports = {
    Account
}