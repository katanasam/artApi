module.exports.validateRegisterInput = (
    username,
    email,
    password,
    cPassword
) => {

    //! object errors récuperation l'enssemble des erreurs
    const errors = {};

    //! {USERNAME}  verification si le non utilisateur et vide ou non
    if(username.trim() === ''){
        errors.username = "Le Nom d'utilisateur ne peut pas etre vide."
    }

    //! {EMAIL} verification email note vide et conform 
    //* PROBLEME AVEC LA PLUS  REGEX

    
    if(email.trim() === ''){
        //const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z])/;

        //console.log(email);

        // if(!email.match(regEx)){
          errors.email = "L'email doit etre une adresse valide."
        // }
    }

    //! {PASSWORD} verification password note vide  et conform
    if(password.trim() === ''){
        errors.password = "Le password ne peut pas etre vide !"

    
    }else if (password != cPassword){
        errors.cPassword = "Les 2 passwords doivent etre identique !"
    }

    //! retour 
    return {
        errors,
        valid: Object.keys(errors).length < 1 
    }
}


module.exports.validateLoginInput =( email,password) => {

    const errors ={};

    if(email.trim() === ''){
      
        errors.email = "L'email doit etre une adresse valide."
       
    }

    //! {PASSWORD} verification password note vide  et conform
    if(password.trim() === ''){
        errors.password = "Le password ne peut pas etre vide !"
    }

    //! retour 
    return {
        errors,
        valid: Object.keys(errors).length < 1 
    }
}
