import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import Hello from './components/hello';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>App to test Apollo</h2>
        <Hello />
      </div>
    </ApolloProvider>
  );
}

export default App;
