const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
const express = require("express");

const db = require("./db");
const typeDefs = require("./schema");
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Subscription = require("./resolvers/Subscription")
const User = require("./resolvers/User")
const Post = require("./resolvers/Post")
const Comment = require("./resolvers/Comment");
const { env } = require('process');
const app = express();

const httpServer = createServer(app);
const schema = makeExecutableSchema({
    typeDefs, resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    }
})
const pubSub = new PubSub();
const server = new ApolloServer({
    schema,
    context: (request) =>{
        return {
            db,
            pubSub,
            request
        }
    }
})

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

useServer({ schema, context: (request) => {return { db, pubSub, request }} }, wsServer);

server.start().then(resp => {
    server.applyMiddleware({ app });
});
const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}${server.graphqlPath}`))