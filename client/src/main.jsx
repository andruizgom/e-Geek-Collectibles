import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store/index.js";
import { Provider } from "react-redux";
import axios from "axios";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
          <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>

  
);
