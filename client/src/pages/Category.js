import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Rating, Breadcrumbs, Anchor } from "@mantine/core";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Category = () => {
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
        const response = await axios.get(`http://localhost:5000/products/category/${productCategory}`);
        const data = await response.data;
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
      <Helmet>
        <title>{productCategory} Pilihan Terlengkap & Produk Terbaru</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navbar />
      <div className="container mt-5 pt-5 text-center">
        <Breadcrumbs separator=">" mt="xs" className="d-flex justify-content-center">
          {items}
        </Breadcrumbs>
        <div className="row mt-4 product-container">
          {products.map((product) => (
            <div className="col-md-2">
              <a href={`/products/${product._id}`} className="btn btn-light mx-3 p-2 my-2">
                <div className="card text-center" style={{ width: 10 + "rem" }}>
                  <img src={product.image} className="card-img-top mx-auto d-block my-4" alt="Product 1" style={{ width: 100 + "px", height: 100 + "px" }} />
                  <div className="card-body">
                    <h6 className="card-title" style={{ width: 130 + "px", overflow: "hidden", display: "inlineBlock", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {product.product_name}
                    </h6>
                    <p className="card-text my-3">Rp. {product.price.toLocaleString()}</p>
                    <p className="card-text">
                      <Rating value={product.rating.rate} fractions={2} readOnly className="mx-auto my-2" /> ({product.rating.count})
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
