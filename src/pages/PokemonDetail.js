import React, { useState } from "react";
import { GET_POKEMON_DETAIL } from "../API/api";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "../components/LoadingBar";
import Badge from "../components/Badge";
import PokemonCatchModal from "../components/PokemonCatchModal";
import close_icon from "../assets/icons/close_icon.png";

import "../assets/PokemonDetail.css";
import pokeball from "../assets/icons/pokeball.png";

const PokemonDetail = () => {
  // get pokemon name from params
  const { name } = useParams();

  // API call for pokemon detail
  const { loading, error, data: pokemonDetail } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
    onError: (e) => {
      throw e;
    },
  });

  // state to store pokemon caught status
  const [isPokemonCaught, setIsPokemonCaught] = useState(null);

  // probability to catch pokemon of 50%
  const getRandomSuccess = () => {
    return Math.random() < 0.5;
  };

  const simulatePokemonCatch = () => {
    setIsPokemonCaught(getRandomSuccess());
  };

  // hide modal for catching pokemon
  const hideCatchModal = () => {
    setIsPokemonCaught(null);
  };

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
              <p className="pokemon-detail__title">{name}</p>

              {/* POKEMON TYPE */}
              <p className="pokemon-detail__sub-title">Pokémon Type</p>
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

              {/* POKEMON MOVES */}
              <p className="pokemon-detail__sub-title">Pokémon Moves</p>
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

          {/* overlay and modal for catching pokemon interaction */}
          {isPokemonCaught !== null && (
            <div className="overlay">
              <div className="modal__close" onClick={hideCatchModal}>
                <img src={close_icon} title="close" alt="close x" />
              </div>
              <PokemonCatchModal
                pokemon={name}
                isPokemonCaught={isPokemonCaught}
                pokemonDetail={pokemonDetail}
              />
            </div>
          )}

          {/* pokeball to catch pokemon and trigger pokemon catching modal */}
          {(!isPokemonCaught || isPokemonCaught === null) && (
            <div className="pokeball-catch" onClick={simulatePokemonCatch}>
              <img src={pokeball} alt="pokeball" />
              <button>catch</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PokemonDetail;
