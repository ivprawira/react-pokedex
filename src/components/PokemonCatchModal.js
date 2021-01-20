import React, { useState, useEffect } from "react";
import { set, get, keys } from 'idb-keyval'
import { useHistory } from 'react-router-dom'
import "../assets/PokemonCatchModal.css";

const PokemonCatchModal = ({ pokemon, isPokemonCaught, pokemonDetail }) => {
  // get namelist of my pokemons
  // to check whether nickname is duplicate or not
  const [nameList, setNameList] = useState([]);
  useEffect( () => {
    const fetchData = async () => {
      const result = await keys()
      setNameList(result)
    }
    fetchData()
  }, [])

  // get existing my pokemon ids
  const [registeredIds, setRegisteredIds] = useState([])
  useEffect( () => {
    const fetchIds = async () => {
      const res = await get('')
      setRegisteredIds(res)
    }
    fetchIds()
  }, [])
  
  // titleMessage give title for modal
  // message give description whether pokemon successfully caught or not 
  let titleMessage = isPokemonCaught ? "GOTCHA" : "OH NO...";
  let message = isPokemonCaught ? "was caught!" : "has escaped";

  // nickname for newly caught pokemon
  const [nickname, setNickname] = useState("");
  
  //handle input text
  const handleNicknameInput = (event) => {
    event.preventDefault();
    setNickname(event.target.value);
  };

  // register caught pokemon id to idb-keyval
  // OR set up to idb-keyval if no pokemon is caught
  const registerPokemonId = () => {
    if (nameList.includes('')) {
      const newIds = [...registeredIds, pokemonDetail.pokemon.id]
      set('', newIds)
    } else {
      set('', [pokemonDetail.pokemon.id])
    }
  }

  // action if validate nickname successful
  const history = useHistory()
  const setMyPokemon = () => {
    set(nickname, pokemonDetail)
    registerPokemonId()
    history.push('/myPokemonList')
  }

  // check if nickname alrdy registered
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
      <p className="catch-modal__title">{titleMessage}</p>
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
