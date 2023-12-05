import React from "react";
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

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      {window.location.pathname !== "/" && <Navigation />}
      <CartProvider>
        <Routes>
        <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
          <Route exact path="/create" element={<Form />} />
          <Route exact path="/userform" element={<UserForm />} />
          <Route exact path="/shippingForm" element={<ShippingForm />} />
          {isAuthenticated && <Route exact path="/user" element={<User />} />}
          {isAuthenticated && <Route path="/admin" element={<Admin />} />}
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
