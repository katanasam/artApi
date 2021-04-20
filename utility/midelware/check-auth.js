const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');

// clee de codage du token
const {SECRET_KEY} = require('../../config');


module.exports = (context) => {
    // TODO verification que le header contien le token  si oui retouner un user
    //context = {...headers}

    const authHeader = context.req.headers.authorization;

    //!  verification de la presence du header  avec la cle authorization et le token
    if(authHeader){
        // recuperation de token
        //!  recuperation du token apres le mot 'Bearer '
        const token = authHeader.split('Bearer ')[1];

        if(token){
            
            try {
                 // decodage du token
               const user = jwt.verify(token, SECRET_KEY)
            
               return user; 

            }
            catch (error){

                throw new AuthenticationError('Le TOKEN et expirer ou INVALIDE')
            }

            
        }
        
        throw new Error("Il manque le TOKEN => 'Bearer [token]' " );
    }

    throw new Error( "Il manque le TOKEN dans le HEADER => [ Authorization = 'Bearer [token]' ] " );
}