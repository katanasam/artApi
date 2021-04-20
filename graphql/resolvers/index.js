//! RESOLVERS
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentResolvers = require('./comment');

//! ici on impotre tous les resolver utiles dans un seul fichiers 


//* puis on les exports
module.exports = {
    Query: {
        ...postsResolvers.Query,

        ...commentResolvers.Query

    },
    
    Mutation: {
        ...usersResolvers.Mutation,

        ...postsResolvers.Mutation,

        ...commentResolvers.Mutation
    }
}