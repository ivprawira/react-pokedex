import React from "react";
import { GET_POKEMON_DETAIL } from "../API/api";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "../components/LoadingBar";
import Badge from "../components/Badge";

import "../assets/PokemonDetail.css";
import pokeball from "../assets/icons/pokeball.png";

const PokemonDetail = () => {
  const { name } = useParams();

  const { loading, error, data: pokemonDetail } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
    onError: (e) => {
      throw e;
    },
  });

  return (
    <>
      <Navbar pageTitle={`Pokémon Detail - ${name}`} />
      {error && `Error! ${error.message}`}
      {loading && (
        <div className="pokemon-detail">
          <LoadingBar />
        </div>
      )}
      {!(error || loading) && (
        <>
          <div className="pokemon-detail">
            <img
              src={pokemonDetail.pokemon.sprites.front_default}
              alt={`${name} Profile`}
            />
            <div className="pokemon-detail__box">
              <p>{name}</p>
              <div className="pokemon-detail__badges">
                {pokemonDetail.pokemon.types.map((type, key) => {
                  return (
                    <Badge
                      key={key}
                      badgeText={type.type.name}
                      tooltip="Pokémon Type"
                    />
                  );
                })}
              </div>
              <div className="pokemon-detail__badges">
                {pokemonDetail.pokemon.moves.map((move, key) => {
                  return (
                    <Badge
                      key={key}
                      badgeText={move.move.name}
                      tooltip="Pokémon Move"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="pokeball-catch">
            <img src={pokeball} alt="pokeball" />
            <button>catch</button>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonDetail;
