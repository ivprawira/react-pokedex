import React from "react";
import { Link } from "react-router-dom";

import "../assets/PokemonTile.css";

const PokemonTile = ({ name, imageURL, isMyPokemon = false }) => {
  const redirectLink = isMyPokemon ? `/myPokemonDetail/${name}` : `/pokemonDetail/${name}`

  return (
    <Link to={redirectLink}>
      <div className="pokemon-tile">
        <img src={imageURL} alt={`${name} Pokemon Profile`} />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PokemonTile;
