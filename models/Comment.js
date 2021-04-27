const {model, Schema } = require('mongoose');

//! creation dun schema pour le Comment
const commentSchema = new Schema({
    body: String,
    createdAt: String,
    updateAt : String,
    type: String,
    numberOfReponse: Number,
    response : [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],

    likes : [ { type: Schema.Types.ObjectId, ref: 'Like' } ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Comment', commentSchema);