import React from 'react';
import './App.css';
import {MuiThemeProvider} from "@material-ui/core";
import Tabs from "./components/Tabs/Tabs";
import theme from "./components/theme";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql'
})

function App() {
  return (
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <Tabs />
        </MuiThemeProvider>
      </ApolloProvider>
  );
}

export default App;