import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Provider as StoreProvider } from "mobx-react";
import { createBrowserHistory } from "history";
import RootStore from "./stores";
import App from "./App";
import { Router } from "react-router";

const rootStore = new RootStore();
const client = new ApolloClient({ uri: process.env.REACT_APP_API_URI });

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider {...rootStore}>
      <Router history={history}>
        <App />
      </Router>
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
