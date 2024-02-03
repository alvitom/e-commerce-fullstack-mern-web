import React, { useEffect, useState } from "react";
import { Modal, Radio, RadioGroup } from "@mantine/core";
import HeadElement from "../components/HeadElement";
import styled from "styled-components";
import axios from "axios";

const CheckoutPage = ({ userId }) => {
  const [modalAddress, setModalAddress] = useState(false);
  const [modalInvalidOrder, setModalInvalidOrder] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/address/${userId}`);
          const { address } = response.data;
          setAddress(address);
          if (address.length > 0) {
            setSelectedAddress(address[0]._id);
          }
        }
      } catch (error) {
        console.error("Gagal melakukan checkout", error.message);
      }
    };

    getUserAddress();

    const getCheckoutItems = async () => {
      try {
        if (userId) {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/checkout/${userId}`);
          const data = response.data;
          setCheckoutItems(data);
          const totalQuantity = data.reduce((total, value) => total + value.quantity, 0);
          setTotalQuantity(totalQuantity);
          const totalPrice = data.reduce((total, value) => total + value.price * value.quantity, 0);
          setTotalPrice(totalPrice);
        }
      } catch (error) {
        // console.error("Gagal melakukan checkout", error.message);
      }
    };

    getCheckoutItems();

    const handlePopstate = () => {
      const currentCheckoutId = sessionStorage.getItem("checkoutId");

      if (currentCheckoutId) {
        axios.delete(`${process.env.REACT_APP_BASEURL}/checkout/${currentCheckoutId}`);
        sessionStorage.removeItem("checkoutId");
      }
    };

    window.addEventListener("beforeunload", handlePopstate);

    return () => {
      window.removeEventListener("beforeunload", handlePopstate);
    };
  }, [userId]);

  const newAddress = address.find((item) => item._id === selectedAddress);

  const handleOrder = async () => {
    if (address.length === 0) {
      return setModalInvalidOrder(true);
    }

    checkoutItems.forEach((item) => {
      item.name = item.name.substring(0, 50);
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/order`, {
        userId,
        items: checkoutItems,
        total: totalPrice,
        shippingAddress: newAddress,
      });
      // setOrderId(response.data.latestOrder);
      const { token } = response.data;
      window.snap.pay(token, {
        onSuccess: async function (result) {
          window.location.assign("/");
          // try {
          //   await axios.post(`${process.env.REACT_APP_BASEURL}/order/${orderId}/complete-payment`);
          // } catch (error) {
          //   console.error("Error completing payment:", error);
          // }
        },
        onPending: function (result) {
          alert("wating your payment!");
          window.location.assign("/");
        },
        onError: function (result) {
          alert("payment failed!");
          window.location.assign("/");
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.error("Gagal melakukan checkout", error.message);
    }
  };

  return (
    <>
      <HeadElement pageTitle="Halaman Checkout" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-xl-6 d-flex flex-column gap-3">
            {address.length === 0 ? (
              <>
                <Button className="btn btn-light py-3 pb-2 border" onClick={() => window.location.assign("/my/address")}>
                  <div className="d-flex justify-content-between align-items-center ">
                    <p>Anda Belum Mengatur Alamat Pengiriman</p>
                    <div className="d-flex gap-2 mb-3">
                      <span>Atur Alamat</span>
                      <i className="bi bi-arrow-right-circle"></i>
                    </div>
                  </div>
                </Button>
              </>
            ) : (
              <>
                <Button className="btn btn-light py-4 border" onClick={() => setModalAddress(true)}>
                  <div className="d-flex justify-content-between align-items-center ">
                    <div className="row">
                      <div className="col-1 text-danger">
                        <i className="bi bi-geo-alt"></i>
                      </div>
                      <div className="col-9 text-start">
                        <p>Alamat Pengiriman</p>
                        <span className="d-block">
                          {newAddress.name} | {newAddress.phone}
                        </span>
                        <span className="d-block">{newAddress.detail}</span>
                        <span className="d-block">
                          {newAddress.subdistrict}, Kota {newAddress.city}, {newAddress.province}, ID {newAddress.postCode}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                      <span>Ubah Alamat</span>
                      <i className="bi bi-arrow-right-circle"></i>
                    </div>
                  </div>
                </Button>
                <Modal opened={modalAddress} onClose={() => setModalAddress(false)} size="md" title="Ubah Alamat" centered>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <RadioGroup value={selectedAddress} onChange={(value) => setSelectedAddress(value)}>
                      {address.map((item) => (
                        <div className="d-flex justify-content-between align-items-center mb-3 border rounded p-3" key={item._id}>
                          <div className="address-container">
                            <span className="d-block">
                              {item.name} | {item.phone}
                            </span>
                            <span className="d-block">{item.detail}</span>
                            <span className="d-block">
                              {item.subdistrict}, Kota {item.city}, {item.province}, ID {item.postCode}
                            </span>
                          </div>
                          <Radio value={item._id} />
                        </div>
                      ))}
                    </RadioGroup>
                    <button className="btn btn-primary w-50 p-2" onClick={() => setModalAddress(false)}>
                      Ubah
                    </button>
                  </div>
                </Modal>
              </>
            )}
            <div className="text-secondary border-2" style={{ borderStyle: "dashed" }}></div>
            <div className="bg-light border rounded p-3">
              {checkoutItems.map((item) => (
                <div className={checkoutItems.length === 1 ? "row justify-content-center align-items-center" : "row justify-content-center align-items-center mb-4"} key={item.id}>
                  <div className="col-2">
                    <img src={item.image} className="img-fluid" alt={item.name} />
                  </div>
                  <div className="col-10 d-flex flex-column">
                    <p className="fw-bold">{item.name}</p>
                    <span>Rp. {item.price.toLocaleString()}</span>
                    <span className="text-end fs-5">
                      <strong>{item.quantity}x</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* <Button className="d-flex justify-content-between align-items-center btn btn-light border border-success text-success" onClick={open}>
              <p className="">
                <i className="bi bi-truck"></i> Opsi Pengiriman
              </p>
              <p>
                <i className="bi bi-arrow-right-circle"></i>
              </p>
            </Button> */}

            <div className="d-flex justify-content-between align-items-center border-bottom">
              <label className="w-75">Pesan : </label>
              <input type="text" name="" id="" placeholder="Silahkan tinggalkan pesan..." className="form-control w-50 border border-0" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <label>
                Total Pesanan <strong>({totalQuantity} produk)</strong>
              </label>
              <span className="fs-5 text-primary fw-bold">Rp. {totalPrice.toLocaleString()}</span>
            </div>

            {/* <Button className="d-flex justify-content-between align-items-center btn btn-light border" onClick={() => setModalVoucher(true)}>
              <p>
                <i className="bi bi-ticket-perforated"></i> Voucher
              </p>
              <p>
                <i className="bi bi-arrow-right-circle"></i>
              </p>
            </Button>

            <Modal opened={modalVoucher} onClose={() => setModalVoucher(false)} title="Pilih Voucher" size="sm" centered>
              <div className="d-flex justify-content-evenly">
                <input type="text" name="" id="" placeholder="Masukkan Kode Voucher" className="form-control w-75 mt-2" />
                <button className="btn btn-dark mt-2">Pakai</button>
              </div>
            </Modal> */}

            <div className="Rincian-Pembayaran-Section">
              <h3 className="mt-3">
                <i className="bi bi-journal-text text-primary"></i> Rincian Pembayaran
              </h3>
              <div className="d-flex justify-content-between mt-3">
                <p>Subtotal</p>
                <p>Rp. {totalPrice.toLocaleString()}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="fs-5 fw-bold">Total Pembayaran</p>
                <p className="fs-5 text-primary fw-bold">Rp. {totalPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button className="d-flex justify-content-center gap-3 align-items-center btn btn-primary w-50" onClick={handleOrder}>
                <p>Buat Pesanan</p>
                <p>
                  <i className="bi bi-arrow-right-circle"></i>
                </p>
              </Button>
              <Modal opened={modalInvalidOrder} onClose={() => setModalInvalidOrder(false)} size="sm" withCloseButton={false} centered>
                <div className="d-flex flex-column align-items-center gap-2">
                  <i className="bi bi-x-circle-fill fs-1 text-danger"></i>
                  <p>Anda belum mengatur alamat pengiriman</p>
                  <button className="btn btn-danger" onClick={() => setModalInvalidOrder(false)}>
                    Tutup
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Button = styled.button`
  padding-top: 15px;
  padding-bottom: 0px;
`;

export default CheckoutPage;
