import { useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ProductsView from "../Products/Products";
import Orders from "../Orders/Orders";
import { useState } from "react";
import UserForm from "../UserForm/UserForm";

const Admin = () => {
  const { pathname } = useLocation();
  const [pageProduct, setPageProduct] = useState(false);
  const [pageOrder, setPageOrder] = useState(false);
  const [pageUser, setPageUser] = useState(false);

  const handleProduct = () => {
    setPageProduct(!pageProduct);
    setPageOrder(false);
    setPageUser(false)
  };

  const handleOrder = () => {
    setPageOrder(!pageOrder);
    setPageProduct(false);
    setPageUser(false);
  };
  const handleUser = () => {
    setPageUser(!pageUser)
    setPageOrder(false);
    setPageProduct(false);
  };

  return (
    <div className="flex  bg-slate-100">
      <div>
        <SideBar handleProduct={handleProduct} handleOrder={handleOrder} handleUser={handleUser} />
      </div>

      <div className="flex-1">
        {pageProduct && <ProductsView />}
        {pageOrder && <Orders />}
        {pageUser && <UserForm/>}
      </div>
    </div>
  );
};

export default Admin;
