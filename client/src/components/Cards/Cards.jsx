import React from "react";
import Card from "../Card/Card";
import PageNotFound from "../PageNotFound/PageNotFound";

function Cards({ allProducts }) {
  return (
    <div>
      {allProducts ? (
        allProducts.map((prod) => {
          return (
            <Card
              key={prod.id}
              title={prod.title}
              img={prod.image}
              price={prod.price}
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
