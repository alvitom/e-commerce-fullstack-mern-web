import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import brand from "../../images/brand.png";
import styled from "styled-components";
import { Indicator, Modal } from "@mantine/core";
import axios from "axios";
import SearchProducts from "../SearchProducts";

const Navbar = ({ isLoggedIn, userId, user }) => {
  const [modalLogout, setModalLogout] = useState(false);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const getCartCount = async () => {
      if (userId) {
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/cart/${userId}`);
        const { items } = await response.data;
        setCartItems(items.length);
      }
    };

    getCartCount();
  }, [userId, cartItems]);

  const handleCart = () => {
    if (isLoggedIn) {
      window.location.assign("/my/cart");
    } else {
      window.location.assign("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
    setModalLogout(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container py-3">
          <a className="navbar-brand position-absolute" href="/">
            <img src={brand} alt="Shophub" style={{ width: 200 + "px" }} />
          </a>
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Kategori
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href={`/products/category/Pakaian Pria`}>
                      Pakaian Pria
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Pakaian Wanita`}>
                      Pakaian Wanita
                    </a>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href={`/products/category/Pakaian Anak-Anak`}>
                      Pakaian Anak-Anak
                    </a>
                  </li> */}
                </ul>
              </Li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Hubungi Kami
                </a>
              </li> */}
            </ul>

            <SearchProducts />

            <button className="btn btn-outline-light me-5" onClick={handleCart}>
              {cartItems > 0 ? (
                <Indicator position="top-end" label={cartItems} size={25} offset={-9}>
                  <i className="bi bi-bag-fill"></i>
                </Indicator>
              ) : (
                <i className="bi bi-bag-fill"></i>
              )}
            </button>
            {isLoggedIn ? (
              <Dropdown className="d-flex">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Profil</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Pesanan Saya</Dropdown.Item>
                  <Dropdown.Item href="/my/address">Alamat Saya</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setModalLogout(true)}>Keluar</Dropdown.Item>
                  <Modal opened={modalLogout} onClose={() => setModalLogout(false)} withCloseButton={false} size="sm" centered>
                    <div>
                      <p className="fs-5 text-center mb-4">Apakah anda ingin keluar?</p>
                      <div className="d-flex justify-content-center">
                        <button onClick={() => setModalLogout(false)} className="btn btn-outline-dark">
                          Batal
                        </button>
                        <button onClick={handleLogout} className="btn btn-danger ms-5">
                          Keluar
                        </button>
                      </div>
                    </div>
                  </Modal>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex">
                <a href="/login" className="btn btn-primary me-2">
                  Masuk
                </a>
                <a href="/register" className="btn btn-outline-light">
                  Daftar
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

const Li = styled.li`
  margin-left: 250px;
`;

export default Navbar;
