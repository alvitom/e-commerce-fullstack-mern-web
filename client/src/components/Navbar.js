import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Button, Dropdown } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import brand from "../images/brand.png";

function Navbar({ cartQuantity, setCartQuantity }) {
  const { isLoggedIn, logout } = useAuth();
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      // Simulasikan pengambilan informasi pengguna dari server
      // Anda dapat mengganti ini dengan panggilan API sesungguhnya
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = await response.data;

          // Ambil nama pengguna dan simpan ke state
          setUsername(userData.username);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleCart = () => {
    if (isLoggedIn) {
      navigate("/cart");
      navigate(0);
    } else {
      navigate("/login");
      navigate(0);
    }
  };

  const handleLogout = () => {
    // Hapus token dan userId dari localStorage atau state, atau cookie
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand mx-4" href="/">
            <img src={brand} alt="Shophub" style={{ width: 70 + "px" }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kategori
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href={`/products/category/Elektronik`}>
                      Elektronik
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Perhiasan`}>
                      Perhiasan
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Fashion Pria`}>
                      Fashion Pria
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Fashion Wanita`}>
                      Fashion Wanita
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Gaming`}>
                      Gaming
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Komputer & Laptop`}>
                      Komputer & Laptop
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Audio, Kamera & Elektronik Lainnya`}>
                      Audio, Kamera, & Elektronik Lainnya
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Olahraga`}>
                      Olahraga
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href={`/products/category/Handphone & Tablet`}>
                      Handphone & Tablet
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tentang Kami
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Hubungi Kami
                </a>
              </li>
            </ul>
            <div className="d-flex me-auto" role="search">
              <input className="form-control me-2 form-control" type="search" placeholder="Mau cari apa mase?" aria-label="Search" />
              <a href="" className="btn btn-primary">
                <i class="bi bi-search"></i>
              </a>
            </div>
            <button class="btn btn-outline-light me-2">
              <i class="bi bi-truck"></i> Lacak Pesanan
            </button>
            <button class="btn btn-outline-light" onClick={handleCart}>
              <i class="bi bi-bag-fill"></i>
            </button>
            {isLoggedIn ? (
              <Dropdown className="d-flex ms-auto me-3">
                <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                  Akun Saya
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Profil</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Pengaturan</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Keluar</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div class="d-flex ms-auto me-3">
                <a href="/login" class="btn btn-primary me-2">
                  Masuk
                </a>
                <a href="/register" class="btn btn-outline-light">
                  Daftar
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
