import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get("http://localhost:5000/auth/check-auth", {
          headers: { Authorization: token },
        });
        const { userId } = response.data;
        setIsLoggedIn(true);
        setUserId(userId);
      }
    } catch (error) {
      // console.error("Gagal memeriksa otentikasi", error.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [userId]);

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';  
  
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
  
    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    const myMidtransClientKey = 'SB-Mid-client-nZ60v6I3H2Ctvei1';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);
  
  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.

  return (
    <MantineProvider theme={theme}>
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" ? <Navbar isLoggedIn={isLoggedIn} userId={userId} /> : null}
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
