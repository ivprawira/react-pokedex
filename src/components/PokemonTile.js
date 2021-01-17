import React from "react";
import { Link } from "react-router-dom";

import "../assets/PokemonTile.css";

const PokemonTile = ({ name, imageURL }) => {
  return (
    <Link to={`/pokemonDetail/${name}`}>
      <div className="pokemon-tile">
        <img src={imageURL} alt={`${name} Pokemon Profile`} />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PokemonTile;
