//! recuperation de appolo server
const {ApolloServer} = require('apollo-server');

//! connection  a la base donner grace a mongoose
const mongoose = require('mongoose');
const {MONGODB} = require ('./config.js');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');


const server = new ApolloServer(
  { typeDefs, 
    resolvers,

    // on aura acces au information du body dans le contex de  graphql
    // req = request
    context: ({req}) => ({req})
   });


//! connection a la database
mongoose
.connect(MONGODB, {useNewUrlParser :true ,useUnifiedTopology: true})

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', MONGODB)
})

db.on('error', err => {
  console.error('connection error:', err)
})

//! lancement du server
server.listen({port:5000});
