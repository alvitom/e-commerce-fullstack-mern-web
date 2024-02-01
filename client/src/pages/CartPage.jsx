import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeadElement from "../components/HeadElement";
import axios from "axios";

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        const { items } = response.data;
        setCartItems(items);
      } catch (error) {
        // console.error("Gagal mendapatkan cart items", error.message);
      }
    };

    getCartItems();
  }, [userId, cartItems]);

  const updateQuantity = async (productId, operation) => {
    try {
      const response = await axios.post(`http://localhost:5000/cart/${operation}-quantity`, {
        userId,
        productId,
      });
      const { items } = await response.data;
      setCartItems(items);
    } catch (error) {
      console.error(`Error ${operation} quantity:`, error);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    updateQuantity(productId, "increase");
  };

  const handleDecreaseQuantity = (productId) => {
    updateQuantity(productId, "decrease");
  };

  const initializeCheckedItems = (cartItems) => {
    const initialCheckedItems = {};
    cartItems.forEach((item) => {
      initialCheckedItems[item.productId] = false;
    });
    setCheckedItems(initialCheckedItems);
  };

  const handleCheckChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const calculateTotal = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      if (checkedItems[item.productId]) {
        totalAmount += item.quantity * item.price;
      }
    });
    setTotal(totalAmount);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectAll, checkedItems, cartItems]);

  useEffect(() => {
    if (selectAll) {
      const allChecked = {};
      cartItems.forEach((item) => {
        allChecked[item.productId] = true;
      });
      setCheckedItems(allChecked);
    } else {
      initializeCheckedItems(cartItems);
    }
  }, [selectAll]);

  const handleDeleteItem = async (itemId) => {
    const response = await axios.delete(`http://localhost:5000/cart/${userId}/${itemId}`);
  };

  const handleCheckout = async () => {
    const selectedItems = cartItems.filter((item) => checkedItems[item.productId]);

    try {
      const response = await axios.post("http://localhost:5000/checkout", {
        userId,
        selectedItems,
      });
      setCartItems([]);
      const checkoutId = response.data._id;
      sessionStorage.setItem("checkoutId", checkoutId);
    } catch (error) {
      console.error("Gagal melakukan checkout", error.message);
    }
    window.location.assign("/my/checkout");
  };

  return (
    <>
      <HeadElement pageTitle="Halaman Keranjang Belanja" />
      <div className="container mt-5">
        {cartItems.length === 0 ? (
          <h1 className="text-center">Wah keranjang belanjaanmu kosong nih!</h1>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th>
                    <input type="checkbox" className="form-check-input border-secondary" checked={selectAll} onChange={handleSelectAllChange} style={{ width: 22 + "px", height: 22 + "px", cursor: "pointer" }} />
                  </th>
                  <th></th>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  {/* <th>Total</th> */}
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId} style={{ lineHeight: 100 + "px" }} className="text-center">
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input mt-5 border-secondary"
                        checked={checkedItems[item.productId]}
                        onChange={() => handleCheckChange(item.productId)}
                        style={{ width: 22 + "px", height: 22 + "px", cursor: "pointer" }}
                      />
                    </td>
                    <td>
                      <ImageProduct src={item.productImage} alt={item.productName} />
                    </td>
                    <td>{item.productName}</td>
                    <td>Rp. {item.price?.toLocaleString()}</td>
                    <td>
                      <InputQty className="d-flex justify-content-center align-items-center">
                        <button className={item.quantity > 1 ? "btn btn-dark" : "btn btn-dark disabled"} onClick={() => handleDecreaseQuantity(item.productId)}>
                          -
                        </button>
                        <input type="number" className="form-control w-50 text-center" min={1} max={50} value={item.quantity} allowNegative={false} readOnly />
                        <button className={item.quantity !== item.stock ? "btn btn-dark" : "btn btn-dark disabled"} onClick={() => handleIncreaseQuantity(item.productId)}>
                          +
                        </button>
                      </InputQty>
                    </td>
                    {/* <td>Rp. {(item.price * item.quantity)?.toLocaleString()}</td> */}
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDeleteItem(item._id)}>
                        <i className="bi bi-trash3-fill"></i> Hapus
                      </button>

                      {/* <Modal opened={modalDeleteItem} onClose={() => setModalDeleteItem(false)} withCloseButton={false} size="sm" centered>
                        <div>
                          <p className="fs-5 text-center mb-4">Apakah anda ingin menghapus produk dari keranjang?</p>
                          <div className="d-flex justify-content-center">
                            <button onClick={() => setModalDeleteItem(false)} className="btn btn-outline-dark">
                              Batal
                            </button>
                            <button onClick={() => handleDeleteItem(item._id)} className="btn btn-danger ms-5">
                              Hapus
                            </button>
                          </div>
                        </div>
                      </Modal> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex fixed-bottom justify-content-end align-items-center gap-4 bg-light py-5">
              <h4>
                <strong>Total:</strong> Rp. {total?.toLocaleString()}
              </h4>
              <button onClick={handleCheckout} className={Object.values(checkedItems).some((value) => value) ? "btn btn-primary me-4 p-2" : "btn btn-primary me-4 p-2 disabled"}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ImageProduct = styled.img`
  width: 50px;
  height: 50px;

  @media screen and (min-width: 576px) {
    width: 60px;
    height: 60px;
  }

  @media screen and (min-width: 768px) {
    width: 70px;
    height: 70px;
  }

  @media screen and (min-width: 992px) {
    width: 80px;
    height: 80px;
  }

  @media screen and (min-width: 1200px) {
    width: 90px;
    height: 90px;
  }
`;

const InputQty = styled.div`
  height: 100px;
  padding-block: 50px;
`;

export default CartPage;
