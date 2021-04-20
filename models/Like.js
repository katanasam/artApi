const {model, Schema } = require('mongoose');

//! creation dun schema pour le Comment
const likeSchema = new Schema({
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Like', likeSchema);

