import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import PokemonDetail from './pages/PokemonDetail'
import MyPokemonList from './pages/MyPokemonList';
import MyPokemonDetail from './pages/MyPokemonDetail'
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/pokemonDetail/:name" component={PokemonDetail} />
      <Route path="/myPokemonList" component={MyPokemonList} />
      <Route path="/myPokemonDetail/:name" component={MyPokemonDetail} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>{routing}</React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
