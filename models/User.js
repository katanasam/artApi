const {model, Schema } = require('mongoose');

//! creation dun schema pour le user
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt : String
})


module.exports = model('User', userSchema);