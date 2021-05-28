const jwt = require('jsonwebtoken');

// model user
const Post = require('../../models/Post');
const Comment = require('../../models/comment');
const Like = require('../../models/like');

const checkAuth = require ('../../utility/midelware/check-auth');
const defineContent = require ('../../utility/helpers/content');


module.exports = {
    //! ----------------- LIKE 
    Mutation : {
        async likeContent(parent,{content_Id,type},context){

           // TODO  ------------------- récuperation du user
           const currentUser = checkAuth(context);

            
            // save du like first
            // recuperation du content en fonction de son id and save
            // add le like au tableaux des likes du contenue


            const content = await defineContent(content_Id,type);

            if(content){
                
                //! je verifie que l User na pas deja liker le contenue si oui je retire sont like

                // si le contenue et liker par le user actuelle alors retire le like

                let sms = '';

                if(content.likes.find(like => like.user._id == currentUser.id)){

                    //! je vais suprimer le like ,dans la collection de likes
                    
                    let liketodelete = content.likes.find(like => like.user._id == currentUser.id);
                    console.log('cliketodelete: ',  liketodelete);

                    let confirm = await liketodelete.delete();    

                    //! Retrais du like sur le contenue
                    // filtre moi les like et renvoie moi 
                    // un tabeaux de like , ou le user du like est different du currentUser
                    content.likes = content.likes.slice(like => like.user._id !== currentUser.id);

                    sms = "UNLIKE"

                }
                else {
                        
                    const newlike = new Like({
                        createdAt : new Date().toISOString(),
                        user: currentUser.id,
                    })
                    const _like = await newlike.save();

                    content.likes.unshift({
                        _id:  _like._id,
                    })

                    sms = "LIKE"
                
                }
           

                content.save();
                return "content => ['id':'"+ sms +"']";


            }
            else {
                throw new Error(" Ce Content n'existe pas ! ");
            }

        }
   }
}
