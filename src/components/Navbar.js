import React from "react";
import { Link } from "react-router-dom";
import "../assets/Navbar.css";
import pokeball_icon from "../assets/icons/pokeball_icon.png";
import pokedex_icon from "../assets/icons/pokedex_icon.png";

const Navbar = (props) => {
  return (
    <>
    {/* navbar global / web */}
    <div className="navbar">
      <div className="navbar__item navbar__item--title">{props.pageTitle}</div>
      <div className="spacer"></div>
      <div className="navbar__item navbar-hide">
        <Link to={`/`}>
          <img src={pokedex_icon} alt="Pokedex" />
          <p>Pokédex</p>
        </Link>
      </div>
      <div className="navbar__item navbar-hide">
        <Link to={`/myPokemonList`}>
          <img src={pokeball_icon} alt="Pokeball" />
          <p>My Pokémon</p>
        </Link>
      </div>
    </div>

    {/* FOR MOBILE */}
    <div className="navbar-mobile">
      <div className="navbar-mobile__item">
        <Link to={`/`}>
          <img src={pokedex_icon} alt="Pokedex" />
          <p>Pokédex</p>
        </Link>
      </div>
      <div className="navbar-mobile__item">
        <Link to={`/myPokemonList`}>
          <img src={pokeball_icon} alt="Pokeball" />
          <p>My Pokémon</p>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Navbar;
