import React from "react";
import Card from "../Card/Card";
import PageNotFound from "../PageNotFound/PageNotFound";

import "./Cards.styles.css";

function Cards({ allProducts }) {
  return (
    <div className="container">
      {allProducts ? (
        allProducts.map((prod) => {
          return (
            <Card
              key={prod.id}
              title={prod.title}
              img={prod.image}
              price={prod.price}
              id={prod.id}
            />
          );
        })
      ) : (
        <PageNotFound />
      )}
    </div>
  );
}

export default Cards;
