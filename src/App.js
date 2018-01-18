import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './App.css';

import NodeList from './NodeList';

class App extends Component {
  constructor(...args) {
    super(...args);

    // Change this to the URL of your Drupal site
    const networkInterface = createNetworkInterface(
      'https://drupal.site/graphql'
    );

    this.client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <NodeList />
      </ApolloProvider>
    );
  }
}

export default App;
