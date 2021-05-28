const Post = require('../../models/Post');
const Comment = require('../../models/comment');

module.exports =  function createDirectoryUser(content_id, type){

    switch (type) {

        case 'Post': 
        const post =  await Post.findById(content_id).populate('user')
        .populate({
            path: 'comments',
            populate: { 
                path: 'user' ,
            }
        })
        .populate({
            path: 'likes',
            populate: { 
                path: 'user' ,
              
            }
        })

        return post;

        case 'Comment': 
        const comment =  await Comment.findById(content_id) .populate('user')
        .populate({
            path: 'comments',
            populate: { 
                path: 'user' ,
            }
        })
        return Comment;

        default:
        console.log(`Sorry, ERROR `);
    }
}

module.exports =  function deleteFile(content_id, type){

}


module.exports =  function nameFile(content_id, type){

}

module.exports =  function getDirectory(content_id, type){

}