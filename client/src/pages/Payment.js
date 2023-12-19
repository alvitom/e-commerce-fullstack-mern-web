import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Stepper, Button, Group, px, Fieldset, Radio } from "@mantine/core";
// image transfer bank
import BNI from "../images/Metode-Pembayaran/transfer/BNI.png"
import BRI from "../images/Metode-Pembayaran/transfer/BRI.png"
import BCA from "../images/Metode-Pembayaran/transfer/BCA.png"
import Mandiri from "../images/Metode-Pembayaran/transfer/Mandiri.png"
import BRIVA from "../images/Metode-Pembayaran/transfer/BRIVA.jpg"
import CIMBNIAGA from "../images/Metode-Pembayaran/transfer/CIMBNIAGA.png"
import Maybank from "../images/Metode-Pembayaran/transfer/Maybank.png"
import PermataBank from "../images/Metode-Pembayaran/transfer/PermataBank.jpg"
// image e-wallet
import Gopay from "../images/Metode-Pembayaran/e-wallet/Gopay.png"
import Dana from "../images/Metode-Pembayaran/e-wallet/Dana.png"
import Ovo from "../images/Metode-Pembayaran/e-wallet/Ovo.png"
import ShopeePay from "../images/Metode-Pembayaran/e-wallet/ShopeePay.png"
// image kartu kredit / debit
import Visa from "../images/Metode-Pembayaran/kartu-visa-mastercard/Visa.png"
import MasterCard from "../images/Metode-Pembayaran/kartu-visa-mastercard/MasterCard.png"
// image minimarket
import Alfamart from "../images/Metode-Pembayaran/minimarket/Alfamart.png"
import Indomaret from "../images/Metode-Pembayaran/minimarket/Indomaret.png"
import Lawson from "../images/Metode-Pembayaran/minimarket/Lawson.jpg"
// image pos indonesia
import PosIndonesia from "../images/Jasa-Pengiriman/PosIndonesia.jpg"
// image cicilan tanpa kartu kredit
import Kredivo from "../images/Metode-Pembayaran/cicilan-tanpa-kartu-kredit/Kredivo.png"
import Akulaku from "../images/Metode-Pembayaran/cicilan-tanpa-kartu-kredit/Akulaku.jpg"
import ShopeePayLater from "../images/Metode-Pembayaran/cicilan-tanpa-kartu-kredit/ShopeePayLater.jpg"

const Payment = ({ services }) => {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const nextStep = () => {
    navigate("/checkout/payment");
    window.scrollTo(0, 0);
  };
  const prevStep = () => {
    navigate(-1);
    window.scrollTo(0, 0);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to server)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5" style={{ height: px(1100) }}>
        <Stepper active={active} allowNextStepsSelect={false} mt="xl" mb="xl" iconSize={60}>
          <Stepper.Step
            label={<h5>Langkah 1</h5>}
            description={<h6>Data Diri</h6>}
            icon={
              <h3>
                <i class="bi bi-person-vcard"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Isi Data Diri dan Alamat</h4>
          </Stepper.Step>
          <Stepper.Step
            label={<h5>Langkah 2</h5>}
            description={<h6>Pengiriman</h6>}
            icon={
              <h3>
                <i class="bi bi-truck"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Pilih Jasa Pengiriman</h4>
          </Stepper.Step>
          <Stepper.Step
            label={<h5>Langkah 3</h5>}
            description={<h6>Pembayaran</h6>}
            icon={
              <h3>
                <i class="bi bi-credit-card"></i>
              </h3>
            }
          >
            <h4 className="text-center mt-4">Pilih Metode Pembayaran</h4>
          </Stepper.Step>
          <Stepper.Completed>
            <h4 className="text-center mt-4">Completed, click back button to get to previous step</h4>
          </Stepper.Completed>
        </Stepper>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <Fieldset>
                <Radio label="Transfer Bank (Virtual Account)" name="check" value="check" defaultChecked className="my-4 me-4 d-inline-block" /><img src={BCA} alt="BCA" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Mandiri} alt="Mandiri" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={BNI} alt="BNI" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={BRIVA} alt="BRIVA" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={CIMBNIAGA} alt="CIMBNIAGA" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Maybank} alt="Maybank" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={PermataBank} alt="PermataBank" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />

                <Radio label="Transfer Bank (Konfirmasi Manual)" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={BCA} alt="BCA" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Mandiri} alt="Mandiri" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={BNI} alt="BNI" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={BRI} alt="BRI" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />

                <Radio label="E-Wallet" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={Gopay} alt="Gopay" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Dana} alt="Dana" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Ovo} alt="Ovo" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={ShopeePay} alt="ShopeePay" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />

                <Radio label="Kartu Debit / Kredit" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={Visa} alt="Visa" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={MasterCard} alt="MasterCard" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />

                <Radio label="Minimarket" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={Indomaret} alt="Indomaret" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Alfamart} alt="Alfamart" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Lawson} alt="Lawson" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />

                <Radio label="Pos Indonesia" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={PosIndonesia} alt="Pos Indonesia" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />
                
                <Radio label="Cicilan Tanpa Kartu Kredit" name="check" value="check" className="my-4 me-4 d-inline-block" /><img src={Kredivo} alt="Kredivo" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={Akulaku} alt="Akulaku" style={{ width: 50 + "px" }} className="mb-3 me-3"/><img src={ShopeePayLater} alt="ShopeePayLater" style={{ width: 50 + "px" }} className="mb-3 me-3"/><br />
              </Fieldset>
            </div>
          </div>
          <Group justify="center" mt="xl" mb="xl">
            <Button variant="default" onClick={prevStep} size="md">
              Kembali
            </Button>
            <Button onClick={nextStep} size="md">
              Konfirmasi
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default Payment;
