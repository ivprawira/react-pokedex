import React from "react";
import { Link } from "react-router-dom";

import "../assets/PokemonTile.css";

const PokemonTile = ({ id, name, imageURL, myIdList = [], isMyPokemon = false }) => {
  const redirectLink = isMyPokemon ? `/myPokemonDetail/${name}` : `/pokemonDetail/${name}`
  let count = 0
  
  if (!isMyPokemon) {
    if (myIdList.includes(id)) {
      myIdList.forEach( (myId) => {
        if (myId === id) {count += 1}
      })
    }
  }
  
  return (
    <Link to={redirectLink}>
      <div className="pokemon-tile">
        {!isMyPokemon && (
          <div className="pokemon-tile__owned">
            caught: {count}
          </div>
        )}
        <img src={imageURL} alt={`${name} Pokemon Profile`} />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default PokemonTile;
