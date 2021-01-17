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
  // const [pokemonDetail, setPokemonDetail] = useState({});
  const { name } = useParams();
  // const [variables, setVariables] = useState({
  //   name,
  // });

  const { loading, error, data: pokemonDetail } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name },
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

  return (
    <>
      <Navbar pageTitle={`Pokémon Detail - ${name}`} />
      {error && `Error! ${error.message}`}
      {loading && <LoadingBar />}
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

            <img src={pokeball} alt="pokeball" />
          </div>
        </>
      )}
    </>
  );
};

export default PokemonDetail;
