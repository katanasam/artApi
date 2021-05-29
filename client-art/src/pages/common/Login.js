//  racourcie extancion rcf
import React, { useState } from 'react';
import {Form, Button} from 'semantic-ui-react';

import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

import {useForm} from '../../util/hooks';


function Login(props) {

    const [errors, setErrors] = useState({});

    //! objets values contient les valeurs à envoyer l'api
    const initialState ={
        email: '',
        password: ''

    }

    const {onSubmitForm, onValueChange , values} = useForm(loginUser, initialState)
    

    const [logUser,{loading} ] = useMutation(LOGIN_USER , {

        update(proxy, result){

            console.log(result)

            //redirige sur la page home
            props.history.push('/')
            
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        },

        // toutes les values sont envoyees
        variables: values

    })


    function loginUser(){
        logUser()
    }


    return (

        <div className="form-container">

            <Form onSubmit={onSubmitForm} noValidate className={ loading ? 'loading' : '' } >

                <h1> Login </h1>

 

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

         
                
                <Button type="Submit" primary>
                    Login
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
const LOGIN_USER = gql` 

    #creation des variables et de leur type
    mutation Login(
        $email: String!
        $password: String!

    ){

    #triger la mutation login et assignations des variables

        login( 
            email: $email
            password: $password
        )
        {
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
export default Login;