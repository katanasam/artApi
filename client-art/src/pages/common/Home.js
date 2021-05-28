//  racourcie extancion rcf
import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag'

import { Grid } from 'semantic-ui-react'
import PostCard from '../../components/PostCart';

//! TEST Dune autre card

//* components


function Home() {
    //! recuperation du retour de la requete ou query
    //* useQuery renvoie loading et data
    // ici o n destrure data  null ou undifined
    const { loading, data } = useQuery(FETCH_POST_QUERY);


    // probleme  avec data 
    var  posts = ''

    //* si on récupere des données
    if(data && data !== undefined ){

         posts = data.getPosts 
    }else{
        console.log('undifinnnnnnned')
    }

    return (
        <Grid columns={3} divided>
        <Grid.Row className="page-title">
            <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
            {loading ? (
                <h1> Loading Posts .. </h1>
            ): (
            posts && 
            posts !== undefined &&
            posts.map((post) => (
                
                /* utilisation du composant post  */
                /* envoie du post en props */
                
                <Grid.Column key={post.id} style={{marginBottom:20}} className='nos'>
                    <PostCard post={post} />
                </Grid.Column>

                ))
            )}
       
        </Grid.Row>
      </Grid>
    );
}


//! LES QUERY USE DANS GRAPHQL
const FETCH_POST_QUERY = gql `
{
    getPosts {
        id
        body
        createdAt
        username
        updateAt
        numberOfComments
        numberOfLikes
        likes{
            id
            user {
                id
                email
            }
        }
        comments {
            id
            body
            createdAt
            user {
                id
                email
            }
        }
    }
}
`

//! export vers App et utilisation dans le router
export default Home;