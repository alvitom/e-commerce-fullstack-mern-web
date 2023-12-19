import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CheckoutPage from "../pages/Checkout";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return (
    <>
      <Routes>
        <Route {...rest} render={(props) => (isLoggedIn ? <CheckoutPage {...props} /> : <Navigate to="/login" />)} />
      </Routes>
    </>
  );
};

export default PrivateRoute;
