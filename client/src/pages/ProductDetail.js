import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Rating, px, NumberInput } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const ProductDetail = () => {
  const { isLoggedIn, logout } = useAuth();
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        const data = await response.data;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // const quantityChange = (e) => {
    //   const inputQuantity = parseInt(e.target.value, 10);
    //   setQuantity(isNaN(inputQuantity) ? 1 : inputQuantity);
    // };

    // const addToCart = (selectedProduct, selectedQuantity) => {
    //   const existingItem = cartItems.find((item) => item.productId === selectedProduct._id);

    //   if (existingItem) {
    //     // Jika produk sudah ada di keranjang, tingkatkan jumlahnya
    //     setCartItems(cartItems.map((item) => (item.productId === selectedProduct._id ? { ...item, quantity: item.quantity + selectedQuantity } : item)));
    //   } else {
    //     // Jika produk belum ada di keranjang, tambahkan ke keranjang
    //     setCartItems([...cartItems, { productId: selectedProduct._id, quantity: selectedQuantity, product: selectedProduct }]);
    //   }
    // };

    // addToCart(product, quantity);

    fetchData();
  }, [productId]);

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout/personal-information");
      window.scrollTo(0, 0);
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
  };

  const handleCart = () => {
    if (isLoggedIn) {
      // navigate("/cart");
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
  };

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{product.product_name}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navbar />
      <div className="container mt-5 pt-4" style={{ height: px(1100) }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 mt-3 ">
            <img src={product.image} className="img-fluid my-5" alt={product.product_name} />
          </div>
          <div className="col-md-6 mt-5 ms-3">
            <h2 className="text-center">{product.product_name}</h2>
            <p className="mt-4">{product.description}</p>
            <p className="mt-4">
              <strong>Harga:</strong> Rp. {product.price?.toLocaleString()}
            </p>
            <p className="mt-4">
              <strong>Stok:</strong> {product.stock}
            </p>
            <NumberInput label="Jumlah:" className="mt-4 w-25" id="quantity" clampBehavior="strict" min={1} max={50} defaultValue={1} value={quantity} allowNegative={false} />
            <div className="d-flex">
              <button className="btn btn-outline-dark mt-4 me-2">
                <i class="bi bi-chat-dots"></i>
              </button>
              <button className="btn btn-outline-dark mt-4 me-2" onClick={handleCart}>
                <i class="bi bi-cart-plus"></i>
              </button>
              <button className="btn btn-primary mt-4 w-50" onClick={handleCheckout}>
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <h3>Ulasan Produk</h3>
            <p className="mt-4">Rating : {product.rating?.rate}</p>
            <Rating value={product.rating?.rate} fractions={2} readOnly className="mx-auto" />
            <p className="mt-4">Terjual : {product.rating?.count}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
