import React, { useState } from "react";
import "../assets/App.css";
import Navbar from "../components/Navbar";
import { GET_POKEMON_LIST } from "../API/api.js";
import { useQuery } from "@apollo/client";
import PokemonTile from "../components/PokemonTile";

const App = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [variables, setVariables] = useState({
    limit: 30,
    offset: 0,
  });

  const { loading, error, refetch } = useQuery(GET_POKEMON_LIST, {
    variables,
    onCompleted: (res) => {
      const { results } = res.pokemons;
      setPokemonList(results);
    },
    onError: (e) => {
      throw e;
    },
  });

  const getNextList = () => {
    setVariables({
      ...variables,
      limit: variables.limit + 30,
    });
    refetch();
  };

  return (
    <>
      <Navbar pageTitle="Pokemon List" />
      {error && `Error! ${error.message}`}
      {!error && (
        <>
          <div className="App">
            {pokemonList.map((pokemon, key) => {
              return (
                <PokemonTile
                  key={key}
                  name={pokemon.name}
                  imageURL={pokemon.image}
                />
              );
            })}
          </div>
          {loading && <div>Loading ...</div>}
          <button onClick={getNextList}>Refetch</button>
        </>
      )}
    </>
  );
};

export default App;
