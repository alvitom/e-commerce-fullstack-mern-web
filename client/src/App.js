import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import PersonalInformation from "./pages/PersonalInformation";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import CartPage from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

function App() {
  const theme = createTheme({
    cursorType: 'pointer',
  });

  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/category/:productCategory" element={<Category />} />
          <Route exact path="/products/:productId" element={<ProductDetail />} />
          <Route exact path="/checkout/personal-information" element={<PersonalInformation />} />
          <Route exact path="/checkout/shipping" element={<Shipping />} />
          <Route exact path="/checkout/payment" element={<Payment />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<SignUp />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
