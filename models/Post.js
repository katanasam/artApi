const { model, Schema } = require('mongoose');

//! creation dun schema pour le Post
const postSchema = new Schema({
    body: String,
    createdAt: String,
    username: String,
    updateAt: String,
    numberOfComments: Number,
    numberOfLikes:Number,
    comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],
    likes : [ { type: Schema.Types.ObjectId, ref: 'Like' } ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }

})

module.exports = model('Post', postSchema);