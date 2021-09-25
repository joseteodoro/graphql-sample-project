const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const resolvers = require('./resolvers');

const apollo = new ApolloServer({ typeDefs, resolvers });

module.exports = { apollo };
