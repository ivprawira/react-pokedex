import React, { useState } from "react";
import { set } from 'idb-keyval'
import { useHistory } from 'react-router-dom'
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, pokemonDetail }) => {
  let isSuccess = isPokemonCaught ? "GOTCHA" : "FAILED";
  let message = isPokemonCaught ? "was caught!" : "escaped!";

  const [nickname, setNickname] = useState("");

  const handleNicknameInput = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  const history = useHistory()
  const setMyPokemon = () => {
    set(nickname, pokemonDetail)
    history.push('/')
  }

  return (
    <div className="catch-modal">
      <p>{isSuccess}</p>
      <p>
        {pokemon} {message}
      </p>
      <img src={pokemonDetail.pokemon.sprites.front_default} alt="Pokemon Sprites" />
      <input type="text" value={nickname} onChange={handleNicknameInput} />
      <button onClick={setMyPokemon}>Confirm</button>
    </div>
  );
};

export default PokemonCatchModal;
