import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Produk 1", harga: 499000, jumlah: 2 },
    { id: 2, name: "Produk 2", harga: 649000, jumlah: 1 },
    // ...Tambahkan item lain sesuai kebutuhan
  ]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, jumlah: newQuantity } : item));
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.harga * item.jumlah, 0).toLocaleString();
  };

  return (
    <>
      <Helmet>
        <title>Halaman Keranjang Belanja</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navbar />
      <div className="container mt-5 pt-5">
        {cartItems.length === 0 ? (
          <h1 className="text-center">Wah keranjang belanjaanmu kosong nih!</h1>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Harga</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>Rp. {item.harga?.toLocaleString()}</td>
                    <td>
                      <input
                        type="number"
                        className="w-50"
                        id="quantity"
                        clampBehavior="strict"
                        min={1}
                        max={50}
                        defaultValue={1}
                        value={item.jumlah}
                        allowNegative={false}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target?.value, 10))}
                      />
                    </td>
                    <td>Rp. {(item.harga * item.jumlah).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleRemoveItem(item.id)} className="btn btn-danger btn-sm">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Total:</strong> Rp. {calculateTotal()}
            </p>
            <a href="/checkout/personal-information" className="btn btn-primary">
              Checkout
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
