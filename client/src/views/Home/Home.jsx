import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";

import { getProducts, resetHomeProducts } from "../../redux/actions";
import { fetchProducts } from "../../components/Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const loading = useSelector((state) => state.loading);
  const filtered = useSelector((state) => state.productsFiltered);

  const loadMoreProducts = async () => {
    try {
      dispatch({ type: "LOADING_TRUE" });
      const data = await fetchProducts(currentPage + 1);
      dispatch({ type: "LOADING_FALSE" });
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: data });
    } catch (err) {
      console.error("Error:", err.message);
      dispatch({ type: "LOADING_FALSE" });
    }
  };

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(resetHomeProducts());
    };
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Filters>
        <InfiniteScroll
          dataLength={allProducts.length}
          next={loadMoreProducts}
          hasMore={!loading}
          loader={""}
        >
          {filtered.length > 0 ? (
            <Cards allProducts={filtered} />
          ) : (
            <Cards allProducts={allProducts} />
          )}
        </InfiniteScroll>
      </Filters>
    </div>
  );
}
