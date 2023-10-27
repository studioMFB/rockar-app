import 'dotenv/config';// Needed to access ENV variables.
import http from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from 'apollo-server-express';
// import schema from "./gql/schema";
import Schema from './gql/schema';


async function startApolloServer() {
    const app = express();

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema: Schema.init(),
        // Tell Express to attach GraphQL functionality to the server.
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    }) as any;

    // Start the GraphQL server.
    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.SERVER_PORT || 4000;

    await new Promise((resolve:any) =>
        httpServer.listen({ port: port }, resolve)
    );

    
}

// Run the server.
startApolloServer();
