import React from "react";
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, imageURL }) => {
  let isSuccess = isPokemonCaught ? "GOTCHA" : "FAILED";
  let message = isPokemonCaught ? "was caught!" : "escaped!";

  return (
    <div className="catch-modal">
      <p>{isSuccess}</p>
      <p>
        {pokemon} {message}
      </p>
      <img src={imageURL} alt="Pokemon Sprites" />
    </div>
  );
};

export default PokemonCatchModal;
