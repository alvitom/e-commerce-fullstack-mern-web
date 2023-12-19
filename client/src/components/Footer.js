import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import brand from "../images/brand.png";

const Footer = () => {
  return (
    <footer className="footer mt-5 bg-dark text-white text-center p-3">
      <Container>
        <p>&copy; 2023. <img src={brand} alt="" style={{ width: 80 + "px" }} /></p>
      </Container>
    </footer>
  );
};

export default Footer;
