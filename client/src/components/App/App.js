import React from "react";
import "./App.css";
import LinkList from "../LinkList";
import CreateLink from "../CreateLink";
import Header from "../Header.js";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login";
import Search from "../Search";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
// import { Launches } from "..";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql"
// });
function App() {
  return (
    // <ApolloProvider client={client}>
    // <div className="App">
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="new/1" />} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/top" component={LinkList} />
          <Route exact path="/new/:page" component={LinkList} />
        </Switch>
      </div>
    </div>
    // </div>
    // <Launches />
    // </ApolloProvider>
  );
}

export default App;
