import React, { useState, useEffect } from 'react'
import { entries } from 'idb-keyval'
import "../assets/MyPokemonList.css"
import Navbar from "../components/Navbar"
import EmptyList from "../components/EmptyList"
import PokemonTile from "../components/PokemonTile"


const MyPokemonList = () => {
  // state for my pokemon list
  const [pokemonList, setPokemonList] = useState({ data: [] })

  // fetch my pokemon list from idb-keyval
  useEffect( () => {
    const fetchData = async () => {
      let result = await entries()
      // filter special key (empty string key) that stores my pokemon ids
      result = result.filter( (poke) => {
        return (poke[0] !== '')
      })
      setPokemonList(result)
    }
    fetchData()
  }, [])

  return (
    <>
      <Navbar pageTitle="My Pokémon List" />
      {(pokemonList.length > 0) && (
        <div className="my-pokemon-list">
          {pokemonList.map((pokemon, key) => {
            return (
              <PokemonTile
                key={key}
                name={pokemon[0]}
                imageURL={pokemon[1].pokemon.sprites.front_default}
                isMyPokemon={true}
              />
            );
          })}
        </div>
      )}
      {(pokemonList.length < 1) && (
        <div className="my-pokemon-list">
          <EmptyList />
        </div>
      )}
      
    </>   
  )
}

export default MyPokemonList