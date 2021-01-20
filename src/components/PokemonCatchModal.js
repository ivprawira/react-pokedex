import React, { useState, useEffect } from "react";
import { set, keys } from 'idb-keyval'
import { useHistory } from 'react-router-dom'
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, pokemonDetail }) => {
  const [nameList, setNameList] = useState([]);
  useEffect( () => {
    const fetchData = async () => {
      const result = await keys()
      setNameList(result)
    }
    fetchData()
  }, [])
  
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
    history.push('/myPokemonList')
  }

  const validateNickname = () => {
    if (nameList.includes(nickname)) {
      document.getElementById("nicknameErrMessage").innerHTML = "Name already registered. Please choose another name"
    }
    else {
      setMyPokemon()
    }
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
          <p id="nicknameErrMessage" className="catch-modal__error"></p>
          {(nickname.length > 0) && (<button onClick={validateNickname}>Confirm</button>)}
          </>
      )}
    </div>
  );
};

export default PokemonCatchModal;
