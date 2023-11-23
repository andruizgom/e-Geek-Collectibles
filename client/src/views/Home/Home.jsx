import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";
import Loading from "../../components/Loading/Loading";
import { getProducts } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Filters />
      {allProducts.length === 0 ? (
        <Loading />
      ) : (
        <Cards allProducts={allProducts} />
      )}
    </div>
  );
};

export default Home;
