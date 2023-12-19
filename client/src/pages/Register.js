import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Helmet } from "react-helmet";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username,
        email,
        password,
      });

      console.log(response.data); // Token dan userId
      // Simpan token ke state atau cookie untuk digunakan pada permintaan berikutnya
    } catch (error) {
      console.error("Sign up error:", error.response?.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Halaman Daftar</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h1 className="text-center mb-4">Daftar Sekarang</h1>
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="d-block mt-3 w-100">
                Daftar
              </Button>

              <Button variant="danger" className="w-50 mb-3 mt-3">
                <i class="bi bi-google"></i> Masuk dengan Google
              </Button>

              <Button variant="dark" className="w-50 mb-3 mt-3">
                <i class="bi bi-apple"></i> Masuk dengan Apple
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
