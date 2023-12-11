import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Detail from "./views/Detail/Detail";
import ShoppingCart from "./views/ShoppingCart/ShoppingCart";
import Form from "./components/Form/Form";
import User from "./views/User/User";
import { useAuth0 } from "@auth0/auth0-react";
import { CartProvider } from "./context/CartContext";
import UserForm from "./views/UserForm/UserForm";
import Admin from "./views/Admin/Admin";
import { ShippingForm } from "./views/ShippingForm/ShippingForm";
import FailedPayment from "./views/failedPayment/failedPayment";
import SuccessfullPayment from "./views/successfulPayment/successfullPayment";

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [isAdminLocal, setIsAdminLocal] = useState(true);
  const [isBanned, setIsBanned] = useState(false);

  const checkUser = async (email) => {
    const endpoint = `/users/email`;

    try {
      const response = await axios.get(endpoint, { params: { email: email } });
      const data = response.data;
      if (!data) {
        throw new Error("There was no data");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const status = await checkUser(user?.email);
        setIsAdminLocal(status.isAdmin);
        setIsBanned(status.isBanned);
      } catch (error) {
        console.error("Error while verifying user role:", error.message);
      }
    };

    checkAuthentication();
  }, [isAuthenticated, user?.email]);

  return (
    <div className="App">
      {window.location.pathname !== "/" && <Navigation />}
      <CartProvider>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/admin1" element={<Admin />}>
            <Route path="products" element={<Admin />} />
            <Route path="orders" element={<Admin />} />
            <Route path="users" element={<Admin />} />
          </Route>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="/userform" element={<UserForm />} />
          <Route exact path="/shippingForm" element={<ShippingForm />} />
          <Route exact path="/failedpayment" element={<FailedPayment />} />
          {isAuthenticated && (
            <Route
              exact
              path="/successfullpayment"
              element={<SuccessfullPayment />}
            />
          )}
          {isAuthenticated && !isAdminLocal && !isBanned && (
            <Route exact path="/user" element={<User />} />
          )}
          {isAuthenticated && isAdminLocal && (
            <Route path="/admin" element={<Admin />}>
              <Route path="products" element={<Admin />} />
            </Route>
          )}
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
