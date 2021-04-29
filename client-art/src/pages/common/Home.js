//  racourcie extancion rcf
import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag'

import { Grid } from 'semantic-ui-react'
import PostCard from '../../components/PostCart';

//* components


function Home() {
    //! recuperation du retour de la requete ou query
    //* useQuery renvoie loading et data
    // ici o n destrure data 
    const {loading, 
        data: {getPosts: posts} } = useQuery(FETCH_POST_QUERY);

    //* si on récupere des données
    if(posts){
        console.log(posts)
    }

    return (
        <Grid columns={3} divided>
        <Grid.Row>
            <h1> Recent Posts </h1>
        </Grid.Row>
        <Grid.Row>
            {/*  si les donnes sont en chargement  */}
            {loading ? (
                <h1> Loading Posts .. </h1>
            ): (
            posts && posts.map((post) => (
                
                /* utilisation du composant post  */
                /* envoie du post en props */
                
                <Grid.Column Key={post.id} style={{marginBottom:20}} className='nos'>
                    <PostCard post={post} />
                </Grid.Column>

                ))
            )}
       
        </Grid.Row>
      </Grid>
    );
}


//! les QUERY USE DANS GRAPHQL
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
        # likes{
        #     id
        #     user {
        #         id
        #         email
        #     }
        # }
        # comments {
        #     id
        #     body
        #     createdAt
        #     user {
        #         id
        #         email
        #     }
        # }
    }
}
`

//! export vers App et utilisation dans le router
export default Home;