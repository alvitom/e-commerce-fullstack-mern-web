import React, { useState } from "react";
import { authUser } from "../api";
import HeadElement from "../components/HeadElement";
import { Modal } from "@mantine/core";
import { Body, Form } from "./Login";
import styled from "styled-components";

const SignUp = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalInvalidUser, setModalInvalidUser] = useState(false);
  const [modalInvalid, setModalInvalid] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        await authUser("register", username, email, password);
        setModalSuccess(true);
      } catch (error) {
        setModalInvalidUser(true);
      }
    } else {
      setModalInvalid(true);
    }
  };

  return (
    <>
      <HeadElement pageTitle="Registrasi Akun" />
      <Body className="text-light">
        <Container className="bg-dark rounded">
          <Form onSubmit={handleSignUp}>
            <h1 className="text-center mb-4">Daftar</h1>
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" autoComplete="off" autoFocus />
            <label className="form-label mt-2">Email</label>
            <input type="text" className="form-control" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" autoComplete="off" />
            <label className="form-label mt-2">Password</label>
            <input type="password" className="form-control" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
            <label className="form-label mt-2">Konfirmasi Password</label>
            <input type="password" className="form-control mb-3" placeholder="konfirmasi password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirm-password" />

            <button type="submit" className={username === "" || email === "" || password === "" || confirmPassword === "" ? "btn btn-primary disabled d-block mt-4 w-100" : "btn btn-primary d-block mt-4 w-100"}>
              Daftar
            </button>

            <Modal opened={modalSuccess} onClose={() => setModalSuccess(false)} size="sm" withCloseButton={false} centered>
              <div className="d-flex flex-column align-items-center gap-2">
                <i className="bi bi-check-circle-fill fs-1 text-success"></i>
                <p>Registrasi akun berhasil. Silahkan masuk</p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setModalSuccess(false);
                    window.location.assign("/login");
                  }}
                >
                  OK
                </button>
              </div>
            </Modal>

            <Modal opened={modalInvalidUser} onClose={() => setModalInvalidUser(false)} size="xs" withCloseButton={false} centered>
              <div className="d-flex flex-column align-items-center gap-2">
                <i className="bi bi-exclamation-circle-fill fs-1 text-danger"></i>
                <p>Username sudah terdaftar</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalInvalidUser(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Tutup
                </button>
              </div>
            </Modal>

            <Modal opened={modalInvalid} onClose={() => setModalInvalid(false)} size="xs" withCloseButton={false} centered>
              <div className="d-flex flex-column align-items-center gap-2">
                <i className="bi bi-exclamation-circle-fill fs-1 text-danger"></i>
                <p>Konfirmasi password tidak sesuai</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalInvalid(false);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
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

const Container = styled.div`
  padding: 30px;
  height: 100vh;

  @media screen and (min-width: 1200px) {
    width: 400px;
    margin: 60px auto;
    height: 80%;
  }

  @media screen and (min-width: 1400px) {
    margin: 150px auto;
    height: 55%;
  }
`;

export default SignUp;
