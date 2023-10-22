import http from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer, gql } from 'apollo-server-express';
// import { ApolloServer, gql } from 'apollo-server';
import 'dotenv/config';// Needed to access ENV variables.


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!';
    }
  },
};

// const app = express();
// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app });

// // server.listen().then(({ url }) => {
// //   console.log(`🚀 Server ready at ${url}`);
// // });
// app.listen({ port: 4000 }, () => {
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// });




async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        // Tell Express to attach GraphQL functionality to the server.
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // Start the GraphQL server.
    await server.start();

    server.applyMiddleware({ app });

    const port = process.env.SERVER_PORT || 4000;

    await new Promise((resolve) =>
        httpServer.listen({ port: port }, resolve)
    );
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
}

// Run the server.
startApolloServer(typeDefs, resolvers);