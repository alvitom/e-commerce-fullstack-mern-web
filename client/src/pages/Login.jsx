import React, { useState } from "react";
import { authUser } from "../api";
import HeadElement from "../components/HeadElement";
import styled from "styled-components";
import { Modal } from "@mantine/core";

const Login = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalInvalid, setModalInvalid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await authUser("login", username, null, password);
      localStorage.setItem("token", token);
      setModalSuccess(true);
    } catch (error) {
      setModalInvalid(true);
    }
  };

  return (
    <>
      <HeadElement pageTitle="Masuk" />
      <Body className="text-light">
        <Container className="bg-dark rounded">
          <Form onSubmit={handleLogin} className="mt-2">
            <h1 className="text-center mb-4">Masuk</h1>
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" autoComplete="off" autoFocus />
            <label className="form-label mt-2">Password</label>
            <input type="password" className="form-control mb-3" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
            <span>
              Belum punya akun? <a href="/register">Buat akun</a>
            </span>

            <button type="submit" className={username === "" || password === "" ? "btn btn-primary disabled d-block mt-4 w-100" : "btn btn-primary d-block mt-4 w-100"}>
              Masuk
            </button>

            <Modal opened={modalSuccess} onClose={() => setModalSuccess(false)} size="xs" withCloseButton={false} centered>
              <div className="d-flex flex-column align-items-center gap-2">
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
                <p>Berhasil masuk</p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setModalSuccess(false);
                    window.location.assign("/");
                  }}
                >
                  OK
                </button>
              </div>
            </Modal>

            <Modal opened={modalInvalid} onClose={() => setModalInvalid(false)} size="xs" withCloseButton={false} centered>
              <div className="d-flex flex-column align-items-center gap-2">
                <i className="bi bi-exclamation-circle-fill fs-1 text-danger"></i>
                <p>Username atau password salah</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalInvalid(false);
                    setUsername("");
                    setPassword("");
                  }}
                >
                  Tutup
                </button>
              </div>
            </Modal>
          </Form>
        </Container>
      </Body>
    </>
  );
};

export const Body = styled.div`
  height: 100vh;
  background-color: #aaa;

  @media screen and (min-width: 1200px) {
    padding: 30px;
  }
`;

const Container = styled.div`
  padding: 30px;
  height: 100vh;

  @media screen and (min-width: 1200px) {
    width: 400px;
    margin: 100px auto;
    height: 65%;
  }

  @media screen and (min-width: 1400px) {
    margin: 150px auto;
    height: 45%;
  }
`;

export const Form = styled.form`
  @media screen and (max-width: 992px) {
    margin: 125px auto;
  }

  @media screen and (min-width: 576px) and (max-width: 1030px) {
    width: 400px;
    margin: 225px auto;
  }
`;

export default Login;
