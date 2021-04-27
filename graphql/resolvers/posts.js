const Post = require('../../models/Post');
// Midelware
const Comment = require('../../models/comment');

const checkAuth = require ('../../utility/midelware/check-auth');

module.exports = {

    //! ----------------- POST QUERY
    
    Query : {
        async getPosts(){

            // TODO ------------------- trouver les posts et les renvoyer
            try {
                
                //! IMPORTANT POPULATE  A object lier a plusieurs autres object aussi lier a d'autre objets
                //! -------------------------------------------------------------------------------
                // const posts = await Post.find().populate('user').populate('comments')

                //* dans le post  lorsque tu le trouve et remplies
                //* le champs user avec les infomations du user {id email username ....}
                //* le champs comment avec les infomations du comment {id body createdAt  ....}
                //* -> dans le commentaire que tu va me ramener remplies moi 
                //*   -> les infomations du user {id email username createdAt....}
                //*   -> les infomations des likes {id email username createdAt....}

                //! NESTED ARRAY

                const posts = await Post.find()
                .populate('user')
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

                //! ---------------------------------------------------------------------------------
                //! IMPORTANT POPULATE  -------------------------------------------------------------


                return posts;

            } catch(err){

                throw new Error(err);
            }
        },

        async getPost(parent,{post_Id}){
            
            // TODO ------------------- trouver le post et le renvoyer

            try {

                const post = await Post.findById(post_Id).populate('user');

                if(post){

                    return post;
                }
                else {
                    throw new Error(" Ce post n'existe pas ! ");
                }

            } catch (error) {

                throw new Error(error);
            }
        
        }
    },

    //! ----------------- POST MUTATION

    Mutation : {

         //* CREATE POST
        async createPost(parent,{body}, context){

            // TODO  ------------------- récuperation du user
            const currentUser = checkAuth(context);

            //TODO securité du contenue
            if(body.trim() === ''){
                throw new Error(" Le body ne peut pas etre vide! ");
            }

            console.log(currentUser)

            // TODO ------------------- creer un posts et les renvoyer une confirmation

             //creer un post
             const newPost = new Post({
                 body,
                 user: currentUser.id,
                 username: currentUser.email,
                 createdAt : new Date().toISOString(),
                 updateAt : new Date().toISOString(),
             })

             // recupération du post et de la request
             const post = await newPost.save();

             //! notification
             // on envoie le post juste save 
             context.pubSub.publish('NEW_POST',{
                 newPost: post
             })

            return post;

           
        },

         //* EDIT POST
        async editPost(parent,{post_Id, body},context){

            // TODO ------------------- récuperation du user
            const currentUser = checkAuth(context);

            if(body.trim() === ''){
                throw new Error(" Le body ne peut pas etre vide! ");
            }

                // TODO ------------------- trouver les posts et les renvoyer
                try {

                    const post = await Post.findById(post_Id);

                    if(post){
                        
                        if(post.user == currentUser.id){

                            const editPost = {
                                post,
                                body: body
                            }
                            
                            // si le post existe delete le
                            const _post = await Post.findByIdAndUpdate(post_Id,editPost);

                            return _post;
                        }
                        else {

                            throw new Error(" Ce post appartient à un autre utilisateur => ACCES REFUSER ! ");
                        }

                    }
                    else {

                        throw new Error(" Ce post n'existe pas ! ");

                    }

                } catch (error) {

                    throw new Error(error);
                }
          
        },

        //* DELETE POST
       async deletePost(parent,{post_Id},context){

            // TODO ------------------- récuperation du user
            const currentUser = checkAuth(context);

            console.log(currentUser)

            // TODO ------------------- delete un posts et les renvoyer une confirmation
            // TODO ------------------- trouver les posts et les renvoyer
            try {

                const post = await Post.findById(post_Id);
                
                if(post){
                        if(post.user == currentUser.id){

                        let id = post.id;

                        const confirmationDelete = await Post.findOneAndDelete(post_Id,post);

                        if(confirmationDelete){
                            return "post => ['id':'"+ id +"'] delete avec SUCCESS";
                        }

                    }
                    else {
                        throw new Error(" Ce post appartient à un autre utilisateur => ACCES REFUSER ! ");
                    }
                }
                else {

                    throw new Error(" Ce post n'existe pas ! ");

                }

            } catch (error) {

                throw new Error(error);
            }

        }    
    },

    Subscription: {
        newPost: {
            // LISTENNER
            subscribe: (_,__,{pubSub}) => pubSub.asyncIterator('NEW_POST')
        }
    }
}
