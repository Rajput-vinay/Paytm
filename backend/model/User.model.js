const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true

    },
    lastName: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}