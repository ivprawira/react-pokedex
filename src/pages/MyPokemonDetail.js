import React, { useState, useEffect } from "react";
import { set, get, del } from 'idb-keyval'
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "../components/LoadingBar";
import Badge from "../components/Badge";

import "../assets/PokemonDetail.css";

const MyPokemonDetail = () => {
  // state for pokemon detail
  const [detail, setDetail] = useState({ data: [] })
  
  // get pokemon name from params
  const { name } = useParams();

  // fetch pokemon detail from idb-keyval
  useEffect( () => {
    const fetchDetail = async () => {
      const result = await get(name)
      setDetail(result)
    }
    fetchDetail()
  }, [])

  // fetch my pokemon ids
  const [registeredIds, setRegisteredIds] = useState([])
  useEffect( () => {
    const fetchIds = async () => {
      const res = await get('')
      setRegisteredIds(res)
    }
    fetchIds()
  }, [])

  // update registered ids or my pokemon ids if pokemon is released
  const updateRegisteredIds = () => {
    let tempIds = [...registeredIds]
    const index = tempIds.indexOf(detail.pokemon.id);
    if (index > -1) {
      tempIds.splice(index, 1);
    }
    set('', tempIds)
  }

  // methods or action to release pokemon
  const history = useHistory()
  const releasePokemon = () => {
    del(name)
    updateRegisteredIds()
    history.push('/myPokemonList')
  }

  return (
    <>
      <Navbar pageTitle={`Pokémon Detail - ${name}`} />
      {(detail.pokemon === undefined) && (
        <div className="pokemon-detail">
          <LoadingBar />
        </div>
      )}
      {!(detail.pokemon === undefined) && (
        <>
          <div className="pokemon-detail">
            <img
              src={detail.pokemon.sprites.front_default}
              alt={`${name} Profile`}
            />
            <div className="pokemon-detail__box">
              <p className="pokemon-detail__title">{name}</p>

              {/* POKEMON TYPE */}
              <p className="pokemon-detail__sub-title">Pokémon Type</p>
              <div className="pokemon-detail__badges">
                {detail.pokemon.types.map((type, key) => {
                  return (
                    <Badge
                      key={key}
                      badgeText={type.type.name}
                      tooltip="Pokémon Type"
                    />
                  );
                })}
              </div>

              {/* POKEMON MOVES */}
              <p className="pokemon-detail__sub-title">Pokémon Moves</p>
              <div className="pokemon-detail__badges">
                {detail.pokemon.moves.map((move, key) => {
                  return (
                    <Badge
                      key={key}
                      badgeText={move.move.name}
                      tooltip="Pokémon Move"
                    />
                  );
                })}
              </div>
            </div>
            <div className="release">
              <button onClick={releasePokemon}>Release Pokémon</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyPokemonDetail;