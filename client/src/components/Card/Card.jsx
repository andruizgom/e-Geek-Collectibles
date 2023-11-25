import React from "react";
import { Link } from "react-router-dom";
import "./Card.styles.css";

function Card({ title, id, img, price }) {

  
  return (
    <div className="card">
      <Link to={`/detail/${id}`} className="contentBox">
        <h2>{title}</h2>
        <div className="imgBox">
          <img src={img} className="mouse" />
        </div>
        <p>${price}</p>
        <a href="#" className="buy">
          Comprar
        </a>
      </Link>
    </div>
  );
}

export default Card;
