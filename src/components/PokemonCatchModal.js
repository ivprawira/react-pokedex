import React, { useState } from "react";
import { set } from 'idb-keyval'
import { useHistory } from 'react-router-dom'
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, pokemonDetail }) => {
  let isSuccess = isPokemonCaught ? "GOTCHA" : "OH NO...";
  let message = isPokemonCaught ? "was caught!" : "has escaped";

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
      <p className="catch-modal__title">{isSuccess}</p>
      <p className="catch-modal__title">
        {pokemon} {message}
      </p>
      {!isPokemonCaught && (
        <p className="catch-modal__try-again">
          try again?
        </p>
      )}
      {isPokemonCaught && (
        <>
          <img src={pokemonDetail.pokemon.sprites.front_default} alt="Pokemon Sprites" />
          <p className="catch-modal__caption">let's give nickname to your new friend!</p>
          <input type="text" value={nickname} onChange={handleNicknameInput} />
          {(nickname.length > 0) && (<button onClick={setMyPokemon}>Confirm</button>)}
        </>
      )}
    </div>
  );
};

export default PokemonCatchModal;
