import React from "react";
import "../assets/Badge.css";

const Badge = ({ badgeText, tooltip }) => {
  return (
    <button className="badge" title={tooltip}>
      {badgeText}
    </button>
  );
};

export default Badge;
