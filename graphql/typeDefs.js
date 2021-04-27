//! recuperation de appolo graphql
//! SCHEMA TYPE DEFS
const {gql} = require('apollo-server');

    //* les query servent a la récupération d'informations
    //* les mutation servent a la modification d'informations

module.exports =  gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        updateAt: String
        user: User
        comments: [Comment]!
        likes: [Like]!
        numberOfComments: Int
        numberOfLikes: Int
    }

    type Comment {
        id: ID
        body: String
        createdAt: String
        updateAt: String
        type: String
        numberOfReponse: Int
        user: User
        likes: Like
        reponses: [Reponse]
    }

    type Reponse {
        id: ID!
        body: String!
        user: User
    }

    type Like {
        id: ID!
        createdAt: String!
        user: User
    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        cPassword: String!
        email: String!
    }

    input ContentInput{
        type: String!
        content_Id: String! 
    }

    type Query {
        getPosts: [Post]
        getPost(post_Id: ID!): Post

        getComments: [Comment]
        getComment(comment_Id: ID!): Comment


        # user getUserPosts
        # user getUserComments
        # user getUserAllPost

    }
    
    type Mutation {

        register(registerInput: RegisterInput): User!
        login(email: String! , password: String!): User!

        # user informations suplementaire


        createPost(body: String!): Post!
        editPost(post_Id: ID!,body: String): Post!
        deletePost(post_Id: ID!): String!
        # addImageToContent

        createComment(post_Id: ID!,body: String!): Comment!
        editComment(comment_Id: ID!,body: String): Comment!
        deleteComment(comment_Id: ID!, content_id: String!, type: String): String!
        
        # reponseComment()
        # deleteComment()



        likeContent(content_Id: ID!, type: String!): String 
        
        # follow(content_Id: ID!, type: String!): String 
        # friends(content_Id: ID!, type: String!): String 

    }

    type Subscription {
        # A chaque fois qu 'un post sera creer on avertie les gens qui like ou subcribe au post
        newPost: Post!

    }
`;
