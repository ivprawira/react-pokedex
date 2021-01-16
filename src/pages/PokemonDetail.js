import React, { useState } from "react";
import { GET_POKEMON_DETAIL } from "../API/api";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const PokemonDetail = () => {
  // const [pokemonDetail, setPokemonDetail] = useState({});
  const { name } = useParams();
  const [variables, setVariables] = useState({
    name,
  });

  const { loading, error, data: pokemonDetail } = useQuery(GET_POKEMON_DETAIL, {
    variables,
    // onCompleted: (res) => {
    //   console.log("A");
    //   console.log(res);
    //   const { pokemon } = res;
    //   setPokemonDetail(pokemon);
    // },
    onError: (e) => {
      throw e;
    },
  });
  console.log("AAA");
  console.log(pokemonDetail);
  return (
    <>
      <Navbar pageTitle={`Pokemon Detail - ${name}`} />
      {error && `Error! ${error.message}`}
      {loading && <span>Loading</span>}
      {!(error || loading) && (
        <>
          <img
            src={pokemonDetail.pokemon.sprites.front_default}
            alt={`${name} Profile`}
          />
          <h2>{name}</h2>
          {pokemonDetail.pokemon.types.map((type, key) => {
            return <div key={key}>{type.type.name}</div>;
          })}
          {pokemonDetail.pokemon.moves.map((move, key) => {
            return <div key={key}>{move.move.name}</div>;
          })}
        </>
      )}
    </>
  );
};

export default PokemonDetail;
