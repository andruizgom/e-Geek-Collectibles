import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import Cards from "../../components/Cards/Cards";
import Filters from "../../components/Filters/Filters";
import Loading from "../../components/Loading/Loading";
import { getProducts } from "../../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchProducts } from "../../components/Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const currentPage = useSelector((state) => state.currentPage);
  const loading = useSelector((state) => state.loading);

  const loadMoreProducts = async () => {
    try {
      dispatch({ type: "LOADING_TRUE" }); // Puedes manejar este tipo de acción según tu implementación
      const data = await fetchProducts(currentPage + 1);
      dispatch({ type: "LOADING_FALSE" }); // Puedes manejar este tipo de acción según tu implementación
      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: data }); // Puedes manejar este tipo de acción según tu implementación
    } catch (error) {
      console.error("Error al cargar más productos:", error.message);
      dispatch({ type: "LOADING_FALSE" }); // Puedes manejar este tipo de acción según tu implementación
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Filters />

      <InfiniteScroll
        dataLength={allProducts.length}
        next={loadMoreProducts}
        hasMore={!loading}
        loader={<Loading />}
      >
        <Cards allProducts={allProducts} />
      </InfiniteScroll>

      {loading && <p>Cargando...</p>}
    </div>
  );
};

export default Home;
