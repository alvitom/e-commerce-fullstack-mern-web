import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anchor } from "@mantine/core";
import { getProductList } from "../api";
import ProductList from "../components/ProductList";
import HeadElement from "../components/HeadElement";

const CategoryPage = () => {
  const { productCategory } = useParams();
  const [products, setProducts] = useState([]);
  const items = [
    { title: "Home", href: "/" },
    { title: productCategory, href: `/products/category/${productCategory}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList(`category/${productCategory}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productCategory]);

  if (!products) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <>
      <HeadElement pageTitle={`${productCategory} Pilihan Terlengkap & Produk Terbaru`} />
      <div className="container mt-5 text-center">
        <ProductList items={items} products={products} />
      </div>
    </>
  );
};

export default CategoryPage;
