import { ApolloClient, InMemoryCache } from '@apollo/client';


const PORT = process.env.SERVER_PORT || 4000;

export const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache: new InMemoryCache(),
});