import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import ProductsView from "../Products/Products";
import UserForm from "../UserForm/UserForm";
import OrdersAdmin from "../OrdersAdmin/OrdersAdmin";

const Admin = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen bg-slate-100">
      <SideBar />

      <div className="flex-1 overflow-hidden">
        {pathname === "/admin1/products" && <ProductsView />}
        {pathname === "/admin1/orders" && <OrdersAdmin />}
        {pathname === "/admin1/users" && <UserForm />}
      </div>
    </div>
  );
};

export default Admin;
