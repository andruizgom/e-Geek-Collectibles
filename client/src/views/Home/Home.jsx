import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";
import Navigation from "../../components/Navigation/Navigation";

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
      <Navigation />
      <SearchBar />
      <Filters>
        <InfiniteScroll
          dataLength={allProducts.length}
          next={loadMoreProducts}
          hasMore={!loading}
          loader={""}
        >
          {filtered.length > 0 ? (
            filtered.some((product) => product.id === 0) ? (
              <p className="mt-4 text-center text-red-600">
                Sorry, the product is not available.
              </p>
            ) : (
              <Cards allProducts={filtered} />
            )
          ) : (
            <Cards allProducts={allProducts} />
          )}
        </InfiniteScroll>
      </Filters>
    </div>
  );
}
