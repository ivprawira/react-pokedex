import React, { useState } from 'react'
import { entries } from 'idb-keyval'
import "../assets/MyPokemonList.css"
import Navbar from "../components/Navbar"
import LoadingBar from "../components/LoadingBar"
import PokemonTile from "../components/PokemonTile"

const MyPokemonList = () => {
  const [pokemonList, setPokemonList] = useState([])

  entries().then( (entries) => 
    setPokemonList(entries)
  )

  return (
    <>
      <Navbar pageTitle="Pokédex" />
      <div className="my-pokemon-list">
        {pokemonList.map((pokemon, key) => {
          return (
            <PokemonTile
              key={key}
              name={pokemon[0]}
              imageURL={pokemon[1].pokemon.sprites.front_default}
            />
          );
        })}
      </div>
      {(pokemonList.length === 0) && <LoadingBar />}
      
    </>   
  )
}

export default MyPokemonList