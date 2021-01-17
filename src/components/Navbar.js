import React from "react";
import { Link } from "react-router-dom";

import "../assets/Navbar.css";
import pokeball_icon from "../assets/icons/pokeball_icon.png";
import pokedex_icon from "../assets/icons/pokedex_icon.png";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="navbar__item">Pokedex</div>
      <div className="navbar__item">{props.pageTitle}</div>
      <div className="spacer"></div>
      <div className="navbar__item">
        <Link to={`/`}>
          <img src={pokedex_icon} alt="Pokedex" />
          <p>Pokedex</p>
        </Link>
      </div>
      <div className="navbar__item">
        <Link to={`/`}>
          <img src={pokeball_icon} alt="Pokeball" />
          <p>My Pokemon</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
