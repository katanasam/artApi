const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// model user
const User = require('../../models/User');

// clee de codage du token
const {SECRET_KEY} = require('../../config');

const {UserInputError} = require('apollo-server');

// validator
const {validateRegisterInput, validateLoginInput} = require('../../utility/validator');

//! fonction de génération de token
function generateToken(user){
   const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    },SECRET_KEY , {
        expiresIn: '11h'}
    );


    return token;


}



module.exports = {
    Mutation: {
        
        async login(parent,{email, password}){

            const {valid , errors } = validateLoginInput(email, password)
            if(!valid){
                throw new UserInputError( 'Errors',{errors})
            }


            // TODO ------------------- cherche le user grace à sont email 
            const user = await User.findOne({ email });

            if(!user){

                errors.general = "Cette user n'est pas inscrit, USER NOT FIND";

                throw new UserInputError( 'Erreurimformations email',{errors  })
            }

            // TODO ------------------- verifie que le mot passe soit bon 
            //console.log(user.password_cryter)
            //console.log(password)
            const match = await brcrypt.compare(password, user.password);

            console.log(match)
            if(!match){

                errors.general = "Cette user n'est pas inscrit, USER NOT FIND";

                throw new UserInputError( 'Erreur des imformations d itentification password non conforme',
                {errors  })
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }

        

        },

        async register(
            parent ,
            {registerInput : 
                {
                    username, email, password, cPassword
                }
            },
            context,
            info)
            {

            // TODO -------------------validation des données 
                
                const {valid , errors } = validateRegisterInput( username, email, password, cPassword)

                if(!valid){
                    throw new UserInputError( 'Errors',{errors})
                }


            // TODO -------------------verification de lunicité de email et du username 

                const user = await User.findOne({ email });

                var messageError = 'Cette email => ('+ email +') à déja etais utilisé ';

                if(user){
                    throw new UserInputError( messageError,{
                        errors : {
                            email : messageError
                        }
                    })
                }


            // TODO ------------------- securisé le mot de passe avant mise en base de données 

            //* cryptage du password
            password_cryter = await brcrypt.hash(password,12);

            //* creation d'un nouveau user
            const newUser = new User({
                email,
                username,
                password: password_cryter,
                createdAt: new Date().toISOString()
            });

            //* enregistrement en base de donnée 
            //* creation d un User en retour
            const response = await newUser.save();
            const userSave = response;


            const token = generateToken(userSave);
            return {
                ...userSave._doc,
                id: userSave._id,
                token
            }

        }


    }
}
