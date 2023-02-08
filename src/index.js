import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./store/auth-context";
import CartContextProvider from "./store/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </CartContextProvider>
);
