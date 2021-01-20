import React, { useState, useEffect } from "react";
import { GET_POKEMON_LIST } from "../API/api.js";
import { useQuery } from "@apollo/client";
import { get } from 'idb-keyval'
import Navbar from "../components/Navbar";
import LoadingBar from "../components/LoadingBar";
import PokemonTile from "../components/PokemonTile";
import "../assets/App.css";

const App = (props) => {
  // pokemonList to contain API result
  // variables for API call
  const [pokemonList, setPokemonList] = useState([]);
  const [variables, setVariables] = useState({
    limit: 30,
    offset: 0,
  });

  // prepare my pokemon list to count owned pokemon numbers
  const [myPokemonIdList, setMyPokemonIdList] = useState([])
  useEffect( () => {
    const fetchData = async () => {
      const result = await get('')
      setMyPokemonIdList(result)
    }
    fetchData()
  }, [])

  // API Call
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

  // For Refetch
  const getNextList = () => {
    setVariables({
      ...variables,
      limit: variables.limit + 30,
    });
    refetch();
  };

  return (
    <>
      <Navbar pageTitle="Pokédex" />
      {error && `Error! ${error.message}`}
      {!error && (
        <>
          <div className="App">
            {pokemonList.map((pokemon, key) => {
              return (
                <PokemonTile
                  key={key}
                  id={key+1}
                  name={pokemon.name}
                  imageURL={pokemon.image}
                  myIdList={myPokemonIdList}
                />
              );
            })}
          </div>
          {loading && <LoadingBar />}
          {!loading && (
            <div className="refetch">
              <button onClick={getNextList}>Show more Pokémon</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default App;
