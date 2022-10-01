import React from "react";

import "./Card.css";
import "../UserItem/UserItem.css";

const Card = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
