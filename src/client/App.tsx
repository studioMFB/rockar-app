import React from 'react';
import "./styles/app.scss";
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import Customers from './components/customers';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h2>App to test Apollo</h2>
        <Customers />
      </div>
    </ApolloProvider>
  );
}

export default App;
