const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        default: null,
    },
    status: {
        type: Boolean,
        default: true,
    },


});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel



