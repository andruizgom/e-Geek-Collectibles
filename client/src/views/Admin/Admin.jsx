import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ProductsView from "../Products/Products";
import Orders from "../Orders/Orders";
import { useState } from "react";

const Admin = () => {
  const { pathname } = useLocation();
  const [pageProduct, setPageProduct] = useState(false);
  const [pageOrder, setPageOrder] = useState(false);

  const handleProduct = () => {
    setPageProduct(!pageProduct);
    setPageOrder(false);
  };

  const handleOrder = () => {
    setPageOrder(!pageOrder);
    setPageProduct(false);
  };

  return (
    <div className="flex  bg-slate-100">
      <div>
        <SideBar handleProduct={handleProduct} handleOrder={handleOrder} />
      </div>

      <div className="flex-1">
        {pageProduct && <ProductsView />}
        {pageOrder && <Orders handleOrder={handleOrder} />}
      </div>
    </div>
  );
};

export default Admin;
