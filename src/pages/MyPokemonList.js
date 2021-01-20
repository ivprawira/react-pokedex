import React, { useState, useEffect } from 'react'
import { entries } from 'idb-keyval'
import "../assets/MyPokemonList.css"
import Navbar from "../components/Navbar"
import LoadingBar from "../components/LoadingBar"
import PokemonTile from "../components/PokemonTile"


const MyPokemonList = () => {
  const [pokemonList, setPokemonList] = useState({ data: [] })

  useEffect( () => {
    const fetchData = async () => {
      let result = await entries()
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
      {(pokemonList.length < 1) && <LoadingBar />}
      
    </>   
  )
}

export default MyPokemonList