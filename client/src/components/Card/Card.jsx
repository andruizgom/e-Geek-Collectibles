import React from "react";
import { Link } from "react-router-dom";

function Card({ title, id, img, price }) {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <h2>{title}</h2>
        <img src={img} />
        <p>{price}</p>
      </Link>
    </div>
  );
}

export default Card;
