import ProductsThead from "./ProductsThead";
import ProductsTbody from "./ProductsTbody";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/index";
import { useEffect } from "react";

const ProductsTable = ({ handleOpenModal }) => {
  const dispatch = useDispatch();
  const adminPage = useSelector(({ adminPage }) => adminPage);
  const adminProducts = useSelector(({ adminProducts }) => adminProducts);
  const adSearchProducts = useSelector(
    ({ adSearchProducts }) => adSearchProducts,
  );
  const updateState = useSelector(({ updateState }) => updateState);

  useEffect(() => {
    dispatch(getProducts(adminPage));
  }, [adminPage]);

  useEffect(() => {
    dispatch(getProducts(adminPage));
  }, [updateState]);

  const renderedProducts =
    adSearchProducts.length === 0 ? adminProducts : adSearchProducts;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <ProductsThead />
        <tbody>
          {renderedProducts.map(
            ({ id, title, image, price, available, description }) => (
              <ProductsTbody
                key={id}
                id={id}
                title={title}
                image={image}
                price={price}
                available={available}
                description={description}
                handleOpenModal={handleOpenModal}
              />
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
