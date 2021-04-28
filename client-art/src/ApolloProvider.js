import React from 'react'
import App from './App'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from  'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

//! on met ici notre point dentre grapql
//! base link API
const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache() 
})


//* ENVOIE DANS LE index.js
export default(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)