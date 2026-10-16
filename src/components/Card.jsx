import React from "react";
import "./Card.css"; // create this file for styling

const Card = ({ title, value, color = "blue" }) => {
  return (
    <div className={`card ${color}`}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default Card;