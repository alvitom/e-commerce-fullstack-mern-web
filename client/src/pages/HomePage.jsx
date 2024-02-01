import React, { useEffect, useState } from "react";
import { getProductList } from "../api";
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import HeadElement from "../components/HeadElement";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList("");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeadElement pageTitle="Situs Jual Beli Online Terlengkap, Mudah & Aman | Shophub" />
      <div className="container mt-5">
      <Carousel />
        <ProductList products={products} />
      </div>
    </>
  );
};

export default HomePage;
