import React, { useState } from "react";
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, imageURL }) => {
  let isSuccess = isPokemonCaught ? "GOTCHA" : "FAILED";
  let message = isPokemonCaught ? "was caught!" : "escaped!";

  const [nickname, setNickname] = useState("");

  const handleNicknameInput = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  return (
    <div className="catch-modal">
      <p>{isSuccess}</p>
      <p>
        {pokemon} {message}
      </p>
      <img src={imageURL} alt="Pokemon Sprites" />

      <input type="text" value={nickname} onChange={handleNicknameInput} />
    </div>
  );
};

export default PokemonCatchModal;
