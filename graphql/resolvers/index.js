//! RESOLVERS
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentResolvers = require('./comment');
const likesResolvers = require('./likes');

//! ici on impotre tous les resolver utiles dans un seul fichiers 


//* puis on les exports
module.exports = {

    // Modifyeur
    Post: {
        
        numberOfComments(parent){

            // console.log(parent.comments.length)
            return parent.comments.length
        },

        // arrow function
        numberOfLikes: (parent) => {return parent.likes.length }
    },

    // UTILE Pours les reponse sur les commentaires

    Query: {
        ...postsResolvers.Query,

        ...commentResolvers.Query

    },
    
    Mutation: {
        ...usersResolvers.Mutation,

        ...postsResolvers.Mutation,

        ...commentResolvers.Mutation,
        
        ...likesResolvers.Mutation

    },

    Subscription: {
        ...postsResolvers.Subscription,

    }
}