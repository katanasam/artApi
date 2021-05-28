//  racourcie extancion rcf
import React, { useState } from 'react'
import {Form, Button} from 'semantic-ui-react';

import gql from 'graphql-tag'
import { useMutation } from "@apollo/react-hooks"



function Register(props) {

    const [errors, setErrors] = useState({});

    //! objets values contient les valeurs à envoyer l'api
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        Cpassword: ''

    })

    //! si la valuer d'un chanps change alors (set) une  nouvelle value dans lobjet values
    const onValueChange = (event) => {

        setValues({ ...values, [event.target.name]: event.target.value }); 
    }

    const [addUser,{loading} ] = useMutation(REGISTER_USER , {

        update(proxy, result){

            console.log(result);

            //redirige sur la page home
            props.history.push('/')
            
        },
        onError(err){

            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },

        // toutes les values sont envoyees
        variables: values

    })
    
    const onSubmitForm = (event)=> {

        event.preventDefault();
        
        console.log(event.target )
        addUser();

    }

    return (

        <div className="form-container">

            <Form onSubmit={onSubmitForm} noValidate className={ loading ? 'loading' : '' } >

                <h1> Register </h1>

                <Form.Input 
                    label = "Username"
                    placeholder = "Username"
                    name = "username"
                    value = {values.username}
                    error={errors.username ? true : false}
                    onChange = {onValueChange}
                />

                <Form.Input 
                    label = "Email"
                    placeholder = "Email"
                    name = "email"
                    value = {values.email}
                    error={errors.email ? true : false}

                    onChange = {onValueChange}
                />

                <Form.Input 
                    label = "Password"
                    placeholder = "Password"
                    name = "password"
                    value = {values.password}
                    error={errors.password ? true : false}

                    onChange = {onValueChange}
                />

                <Form.Input 
                    label = "Confirm password"
                    placeholder = "Confirm Password"
                    name = "Cpassword"
                    value = {values.Cpassword}
                   // error={errors.Cpassword ? true : false}

                    onChange = {onValueChange}
                />
                
                <Button type="Submit" primary>
                    Register
                </Button>

            </Form>

           {Object.keys(errors).length > 0 && (
            
                <div className='ui error message'>
                
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}> {value} </li>
                            
                        ))}

                    </ul>

                </div>)
            }

        </div>
    );
}

//! LES QUERY USE DANS GRAPHQL
const REGISTER_USER = gql` 

    #creation des variables et de leur type
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $Cpassword: String!

    ){

    #triger la mutation register et assignations des variables

        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                cPassword: $Cpassword

            }
        ){
            # renvoie les champs desiré
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`


//! export vers App et utilisation dans le router
export default Register;