const {model, Schema } = require('mongoose');

//! creation dun schema pour le user
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt : String,
    // freinds: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    // follower: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    // follow: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    // posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ],
    // comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
})


module.exports = model('User', userSchema);