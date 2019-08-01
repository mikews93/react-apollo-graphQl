import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Launches } from "./components";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Test</h1>
      </div>
      <Launches />
    </ApolloProvider>
  );
}

export default App;
