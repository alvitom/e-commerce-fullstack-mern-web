import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import SignUp from "./pages/Register";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/utils/Navbar";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import axios from "axios";
import Footer from "./components/utils/Footer";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import AddressPage from "./pages/AddressPage";

const App = () => {
  const theme = createTheme({
    cursorType: "pointer",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/auth`, {
          headers: { Authorization: token },
        });
        const { user } = await response.data;
        setIsLoggedIn(true);
        setUserId(user._id);
        setUser(user);
      }
    } catch (err) {
      console.error("Gagal mendapatkan otentikasi: ", err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [userId]);

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <MantineProvider theme={theme}>
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" ? <Navbar isLoggedIn={isLoggedIn} userId={userId} user={user} /> : null}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/products/category/:productCategory" element={<CategoryPage />} />
        <Route exact path="/products/:productId" element={<ProductPage isLoggedIn={isLoggedIn} userId={userId} />} />
        <Route exact path="/my/checkout" element={<CheckoutPage userId={userId} />} />
        <Route exact path="/my/cart" element={<CartPage userId={userId} />} />
        <Route exact path="/my/address" element={<AddressPage userId={userId} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
      </Routes>
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" ? <Footer /> : null}
    </MantineProvider>
  );
};

export default App;
