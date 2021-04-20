const {model, Schema } = require('mongoose');

//! creation dun schema pour le Post
const postSchema = new Schema({
    body: String,
    createdAt: String,
    username: String,
    updateAt: String,
    comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ],

    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    
    user: { type: Schema.Types.ObjectId, ref: 'User' }

})



module.exports = model('Post', postSchema);

    // body: String,
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    // createdAt: String,
    // updateAt: String,
    // // response: [
    //     {
    //         body: String,
    //         username: String,
    //         createdAt: String
    //     }
    // ],
    // likes: [
    //     {
    //         username: String,
    //         createdAt: String
    //     }
    // ]

// const postSchema = new Schema({
//     body: String,
//     createdAt : String,
//     username: String,
//     updateAt : String,
//     comments: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'comments',
//             likes: [ 
//                 {
//                     type: Schema.Types.ObjectId,
//                     ref: 'likes'
//                 }
//             ],
//             responses : [
//                 {
//                     type: Schema.Types.ObjectId,
//                     ref: 'reponses'
//                 }
//             ],

//         }
//     ],
//     likes : [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'likes'
//         }
//     ],
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'users'
//     }

// })
