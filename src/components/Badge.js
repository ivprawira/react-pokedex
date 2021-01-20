import React from "react";
import "../assets/Badge.css";

// simple badge or tag used for pokemon types and moves
const Badge = ({ badgeText, tooltip }) => {
  return (
    <button className="badge" title={tooltip}>
      {badgeText}
    </button>
  );
};

export default Badge;
