import React from "react";
import { Link } from "react-router-dom";

const PokemonTile = ({ name, imageURL }) => {
  return (
    <div>
      <Link to={`/pokemonDetail/${name}`}>
        <img src={imageURL} alt={`${name} Pokemon Profile`} />
        <p>{name}</p>
      </Link>
    </div>
  );
};

export default PokemonTile;
