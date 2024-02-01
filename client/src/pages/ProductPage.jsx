import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating, px, Notification } from "@mantine/core";
import { getProductList } from "../api";
import axios from "axios";
import HeadElement from "../components/HeadElement";

const ProductPage = ({ isLoggedIn, userId }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductList(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleCheckout = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post("http://localhost:5000/checkout", {
          userId,
          productId: product._id,
          productImage: product.image,
          productName: product.product_name,
          price: product.price,
          quantity: quantity,
        });
        const checkoutId = response.data._id;
        sessionStorage.setItem("checkoutId", checkoutId);
      } catch (error) {
        console.error("Gagal melakukan checkout", error.message);
      }
      window.location.assign("/my/checkout");
    } else {
      window.location.assign("/login");
    }
  };

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      try {
        const response = await axios.post("http://localhost:5000/cart/add", {
          userId,
          productId: product._id,
          productImage: product.image,
          productName: product.product_name,
          price: product.price,
          stock: product.stock,
          quantity: quantity,
        });
        setNotification(true);

        setTimeout(() => {
          setNotification(false);
        }, 3000);
      } catch (error) {
        console.error("Gagal menambahkan ke keranjang", error.message);
      }
    } else {
      window.location.assign("/login");
    }
  };

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }

  return (
    <>
      <HeadElement pageTitle={product.product_name} />
      <div className="container" style={{ height: px(1100) }}>
        {notification ? (
          <Notification withCloseButton={false} withBorder title="Produk berhasil ditambahkan ke keranjang" mt="md" icon={<i class="bi bi-check-lg"></i>} color="teal" radius="md" className="w-25 mx-auto"></Notification>
        ) : null}
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
            <div className="d-flex">
              <button className={quantity > 1 ? "btn btn-dark" : "btn btn-dark disabled"} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <input type="number" className="form-control w-25 text-center" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))} readOnly />
              <button className={quantity !== product.stock ? "btn btn-dark" : "btn btn-dark disabled"} onClick={() => setQuantity(quantity + 1)}>
                +
              </button>
            </div>
            <div className="d-flex">
              <a className="btn btn-outline-dark mt-4 me-2 btn-lg" href="whatsapp://send?text=Hello&phone=+6281381547895">
                <i className="bi bi-chat-dots"></i>
              </a>
              <button className="btn btn-outline-dark mt-4 me-2 btn-lg" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus"></i>
              </button>
              <button className="btn btn-primary mt-4 w-50 btn-lg" onClick={handleCheckout}>
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

export default ProductPage;
