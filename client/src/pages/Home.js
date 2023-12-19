import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Rating } from "@mantine/core";
import Footer from "../components/Footer";

const ProductDataComponent = () => {
  const [productData, setProductData] = useState([]);
  const [cartQuantity, setCartQuantity] = React.useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000");
        const data = await response.data;
        setProductData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Situs Jual Beli Online Terlengkap, Mudah & Aman | Shophub</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navbar cartQuantity={cartQuantity} />
      <Carousel />
      <div className="container mt-5 text-center">
        <div className="row mt-5">
          {productData.map((product) => (
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

export default ProductDataComponent;
