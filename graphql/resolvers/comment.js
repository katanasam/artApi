const jwt = require('jsonwebtoken');

// model user
const Post = require('../../models/Post');
const Comment = require('../../models/comment');

const checkAuth = require ('../../utility/midelware/check-auth');


// validator
const {validateRegisterInput, validateLoginInput} = require('../../utility/validator');


module.exports = {
    //! ----------------- POST COMMENT
    Query : {
        async getComments(){

             // TODO ------------------- trouver les posts et les renvoyer

            try {

                const comment = await Comment.find().populate('user')

                console.log('%ccomment', comment);
                
                return comment;

            } catch(err){

                throw new Error(err);
            }
        },

        async getComment(parent,{comment_Id}){
            
            // TODO ------------------- trouver le post et le renvoyer

            try {

                const comment = await Comment.findById(comment_Id).populate('user');

                if(comment){

                    return comment;
                }
                else {
                    throw new Error(" Ce comment n'existe pas ! ");
                }

            } catch (error) {

                throw new Error(error);
            }
        
        }
    },

    Mutation : {

        //* CREATE COMMENT
       async createComment(parent,{post_Id,body}, context){

           // TODO  ------------------- récuperation du user
           const currentUser = checkAuth(context);


           // TODO ------------------- creer un posts et les renvoyer une confirmation

            if(body.trim() === ''){
            throw new Error(" ne peut pas etre vide");
            }

            const post = await Post.findById(post_Id);


            if(post){

                
                const newCom = new Comment ({
                    body,
                    user: currentUser.id,
                    createdAt : new Date().toISOString(),
                    updateAt : new Date().toISOString(),
                    type: "Post"
                });

                const _comment = await newCom.save();

                    
                post.comments.unshift({
                    _id:  _comment._id,
                })

                 post.save();

                 return _comment;


            }
          
       },

        //* EDIT POST
       async editComment(parent,{comment_Id, body},context){

           // TODO ------------------- récuperation du user
           const currentUser = checkAuth(context);

               // TODO ------------------- trouver les posts et les renvoyer
               try {

                   const comment = await Comment.findById(comment_Id);

                   if(comment){
                       
                       if(comment.user == currentUser.id){

                           const editComment = {
                                comment,
                               body: body
                           }
                           
                           // si le post existe delete le
                           const _comment = await Comment.findByIdAndUpdate(comment_Id,editComment);

                           return _comment;
                       }
                       else {
                           
                           throw new Error(" Ce Comment appartient à un autre utilisateur => ACCES REFUSER ! ");
                       }

                   }
                   else {

                       throw new Error(" Ce Comment n'existe pas ! ");

                   }

               } catch (error) {

                   throw new Error(error);
               }
         
       },

       //* DELETE POST
      async deleteComment(parent,{comment_Id},context){

           // TODO ------------------- récuperation du user
           const currentUser = checkAuth(context);


           // TODO ------------------- delete un comment et les renvoyer une confirmation
           try {

               const comment = await Comment.findById(comment_Id);
               
               if(comment){
                       if(comment.user == currentUser.id){

                       let id = comment.id;
                       

                       const confirmationDelete = await Comment.findOneAndDelete(comment_Id,comment);

                       if(confirmationDelete){
                           return "comment => ['id':'"+ id +"'] delete avec SUCCESS";
                       }

                   }
                   else {
                       throw new Error(" Ce Comment appartient à un autre utilisateur => ACCES REFUSER ! ");
                   }
               }
               else {

                   throw new Error(" Ce Comment n'existe pas ! ");

               }

           } catch (error) {

               throw new Error(error);
           }

       }    
   }
}
